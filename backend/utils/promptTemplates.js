// utils/promptTemplates.js - Modified with smart defaults

const promptTemplates = {
  "intro": {
    template: `Write a professional introduction message to {contact_name}, who is a {role} at {company}. 

Context: {context}

Requirements:
- Open with a respectful greeting appropriate for their position
- Briefly establish credibility and relevance 
- Clearly state the purpose of outreach
- Include a specific value proposition related to their role/interests
- End with a clear, low-pressure call to action
- Keep tone professional but approachable
- Length: 3-4 sentences maximum

Return only the message content, ready to send.`,
    
    variables: ["contact_name", "role", "company", "context"],
    defaults: {
      context: "introducing our organization and exploring potential collaboration opportunities"
    }
  },

  "follow_up": {
    template: `Write a follow-up message to {contact_name} regarding our previous interaction.

Previous conversation: {last_message}
Current context: {context}

Requirements:
- Reference our previous interaction naturally
- Add new value or information 
- Show continued relevance to their priorities
- Include a gentle, specific next step
- Maintain professional relationship tone
- Length: 2-3 sentences

Return only the message content, ready to send.`,
    
    variables: ["contact_name", "last_message", "context"],
    defaults: {
      last_message: "our previous conversation about collaboration opportunities",
      context: "sharing updates and next steps for potential partnership"
    }
  },

  "meeting": {
    template: `Write a meeting request message to {contact_name} at {company}.

Meeting purpose: {meeting_purpose}
Proposed duration: {duration}

Requirements:
- Clear, specific meeting purpose appropriate for their role as {role}
- Respect their time with proposed duration
- Offer flexible scheduling
- Highlight mutual benefit and relevance to their work
- Professional but not overly formal tone

Return only the message content, ready to send.`,
    
    variables: ["contact_name", "company", "role", "meeting_purpose", "duration"],
    defaults: {
      meeting_purpose: "discuss potential collaboration and shared priorities",
      duration: "20-30 minutes"
    }
  }
};

// Enhanced buildPrompt function with defaults
function buildPrompt(type, variables) {
  if (!promptTemplates[type]) {
    throw new Error(`Unknown prompt type: ${type}. Available types: ${Object.keys(promptTemplates).join(', ')}`);
  }

  const template = promptTemplates[type];
  
  // Merge provided variables with defaults
  const allVariables = {
    ...template.defaults,
    ...variables
  };

  let prompt = template.template;
  
  // Replace variables in the template
  for (const [key, value] of Object.entries(allVariables)) {
    const placeholder = `{${key}}`;
    prompt = prompt.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), value || '[NOT PROVIDED]');
  }

  return prompt;
}

module.exports = {
  promptTemplates,
  buildPrompt
};