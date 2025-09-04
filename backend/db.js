const Database = require('better-sqlite3');
const db = new Database('outreach.db');

db.pragma('foreign_keys = ON');

// CONTACTS TABLE
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    company TEXT,
    role TEXT,
    context TEXT,
    last_contact TEXT
  );
`);

// MESSAGES TABLE
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    contact_id INTEGER NOT NULL,
    type TEXT,
    content TEXT,
    generated_at TEXT,
    edited BOOLEAN DEFAULT 0,
    status TEXT DEFAULT 'draft',
    FOREIGN KEY(contact_id) REFERENCES contacts(id)
  );
`);

module.exports = db;
