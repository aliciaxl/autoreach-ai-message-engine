const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  const contacts = db.prepare('SELECT * FROM contacts').all();
  res.json(contacts);
});

router.post('/', (req, res) => {
  const { name, email, company, role, context, last_contact } = req.body;
  const stmt = db.prepare(`
    INSERT INTO contacts (name, email, company, role, context, last_contact)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(name, email, company, role, context, last_contact);
  const contact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(contact);
});

router.put('/:id', (req, res) => {
  const { name, email, company, role, context, last_contact } = req.body;
  const stmt = db.prepare(`
    UPDATE contacts SET name = ?, email = ?, company = ?, role = ?, context = ?, last_contact = ?
    WHERE id = ?
  `);
  const info = stmt.run(name, email, company, role, context, last_contact, req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Contact not found' });
  const updatedContact = db.prepare('SELECT * FROM contacts WHERE id = ?').get(req.params.id);
  res.json(updatedContact);
});

router.delete('/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM contacts WHERE id = ?');
  const info = stmt.run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'Contact not found' });
  res.status(204).send();
});

module.exports = router;
