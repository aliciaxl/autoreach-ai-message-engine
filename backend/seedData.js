const db = require('./db');

// Step 1: Clear existing data
db.exec(`DELETE FROM messages;`);
db.exec(`DELETE FROM contacts;`);

// Step 2: Sample contacts
const contacts = [
  {
    id: "pol-1",
    name: "Senator Jennifer Martinez",
    email: "j.martinez@senate.gov",
    company: "U.S. Senate",
    role: "Senator",
    context: "Chair of Technology Subcommittee, advocating for digital privacy rights and AI regulation",
    last_contact: "2024-01-15"
  },
  {
    id: "pol-2",
    name: "David Thompson",
    email: "dthompson@campaignhq.org",
    company: "Progressive Action PAC",
    role: "Campaign Manager",
    context: "Running grassroots campaigns, interested in voter outreach technology and digital organizing tools",
    last_contact: null
  },
  {
    id: "pol-3",
    name: "Maria Santos",
    email: "maria.santos@citycouncil.gov",
    company: "Metro City Council",
    role: "City Councilwoman",
    context: "Focused on municipal technology initiatives, smart city projects, and civic engagement platforms",
    last_contact: "2024-02-01"
  },
  {
    id: "pol-4",
    name: "Robert Kim",
    email: "rkim@democracywatch.org",
    company: "Democracy Watch Institute",
    role: "Policy Director",
    context: "Non-partisan organization monitoring electoral integrity, seeking transparency tools and voter data analytics",
    last_contact: "2024-01-28"
  },
  {
    id: "pol-5",
    name: "Alexandra Petrov",
    email: "apetrov@govtech.state.gov",
    company: "State Digital Services",
    role: "Chief Technology Officer",
    context: "Modernizing government services, implementing citizen-facing digital platforms and data governance",
    last_contact: null
  }
];

// Step 3: Insert contacts and keep a map of old IDs to DB IDs
const contactInsert = db.prepare(`
  INSERT INTO contacts (name, email, company, role, context, last_contact)
  VALUES (@name, @email, @company, @role, @context, @last_contact)
`);

const contactIdMap = {};
for (const contact of contacts) {
  const result = contactInsert.run(contact);
  contactIdMap[contact.id] = result.lastInsertRowid;
}

// Step 4: Sample messages
const messages = [
  {
    contact_id: "pol-1",
    type: "intro",
    content: "Dear Senator Martinez, I hope this message finds you well. As Chair of the Technology Subcommittee, your leadership on AI regulation and digital privacy has been exemplary. I wanted to reach out regarding our new civic engagement platform that could support your committee's oversight efforts...",
    generated_at: "2024-02-15T10:30:00Z",
    edited: false,
    status: "draft"
  },
  {
    contact_id: "pol-2",
    type: "follow_up",
    content: "Hi David, Following up on our conversation about digital organizing tools. I wanted to share some insights on how our voter outreach technology has helped similar grassroots campaigns increase engagement by 40%...",
    generated_at: "2024-02-16T14:20:00Z",
    edited: true,
    status: "sent"
  },
  {
    contact_id: "pol-3",
    type: "meeting",
    content: "Councilwoman Santos, I'd love to schedule a brief meeting to discuss how our smart city solutions could support Metro City's digital transformation initiatives. Would you have 20 minutes next week?",
    generated_at: "2024-02-17T09:15:00Z",
    edited: false,
    status: "scheduled"
  }
];

const messageInsert = db.prepare(`
  INSERT INTO messages (contact_id, type, content, generated_at, edited, status)
  VALUES (?, ?, ?, ?, ?, ?)
`);

for (const msg of messages) {
  const resolvedContactId = contactIdMap[msg.contact_id];
  if (resolvedContactId) {
    messageInsert.run([
      resolvedContactId,
      msg.type,
      msg.content,
      msg.generated_at,
      msg.edited ? 1 : 0,
      msg.status
    ]);
  }
}

console.log("✅ Seeded contacts and messages.");
