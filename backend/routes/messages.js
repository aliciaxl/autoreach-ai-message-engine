// routes/messages.js

const express = require("express");
const axios = require("axios");
const db = require("../db");
const { buildPrompt } = require("../utils/promptTemplates");

const router = express.Router();

router.post("/generate", async (req, res) => {
  console.log("Generate endpoint called with:", req.body);

  const { contactId, type, variables = {} } = req.body;

  // Validate input
  if (!contactId || !type) {
    return res.status(400).json({ error: "contactId and type are required" });
  }

  const contact = db
    .prepare("SELECT * FROM contacts WHERE id = ?")
    .get(contactId);

  if (!contact) {
    return res.status(404).json({ error: "Contact not found" });
  }

  try {
    // Build enhanced prompt with contact data and provided variables
    const promptVariables = {
      contact_name: contact.name,
      role: contact.role,
      company: contact.company,
      ...variables // Allow override and additional variables
    };

    // Build the specific prompt (buildPrompt will handle defaults)
    const prompt = buildPrompt(type, promptVariables);

    console.log("Generated prompt:", prompt);

    const response = await axios.post("http://ollama:11434/api/generate", {
      model: "llama3",
      prompt,
      stream: false,
      options: {
        temperature: 0.7, // Add some creativity while maintaining professionalism
        top_p: 0.9
      }
    });

    if (!response.data || typeof response.data.response !== "string") {
      console.error("Unexpected response format:", response.data);
      return res
        .status(500)
        .json({ error: "Unexpected Ollama response format" });
    }

    let message = response.data.response.trim();
    const generatedAt = new Date().toISOString();

    const stmt = db.prepare(
      "INSERT INTO messages (contact_id, type, content, generated_at) VALUES (?, ?, ?, ?)"
    );
    stmt.run(contactId, type, message, generatedAt);

    res.json({ 
      message,
      variables: promptVariables,
      prompt_type: type
    });

  } catch (err) {
    console.error("Error in message generation:", err);

    if (err.message.includes("Unknown prompt type")) {
      return res.status(400).json({ error: err.message });
    }

    if (err.response) {
      console.error("Ollama Status:", err.response.status);
      console.error("Ollama Data:", err.response.data);
    }

    res.status(500).json({ error: "Message generation failed" });
  }
});

router.get("/:contactId", (req, res) => {
  const messages = db
    .prepare(
      "SELECT * FROM messages WHERE contact_id = ? ORDER BY generated_at DESC"
    )
    .all(req.params.contactId);
  res.json(messages);
});

router.put("/:id", (req, res) => {
  const { content, status } = req.body;
  const messageId = req.params.id;

  const existingMessage = db
    .prepare("SELECT * FROM messages WHERE id = ?")
    .get(messageId);
  if (!existingMessage)
    return res.status(404).json({ error: "Message not found" });

  if (typeof content !== "string" || content.trim() === "") {
    return res
      .status(400)
      .json({ error: "Content must be a non-empty string" });
  }

  // Mark edited as true (1) since content changed
  const stmt = db.prepare(`
    UPDATE messages SET content = ?, status = ?, edited = 1
    WHERE id = ?
  `);
  stmt.run(content, status || existingMessage.status, messageId);

  const updatedMessage = db
    .prepare("SELECT * FROM messages WHERE id = ?")
    .get(messageId);
  res.json(updatedMessage);
});

module.exports = router;