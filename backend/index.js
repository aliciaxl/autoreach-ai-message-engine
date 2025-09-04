const express = require('express');
const cors = require('cors');

const contacts = require('./routes/contacts');
const messages = require('./routes/messages');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/contacts', contacts);
app.use('/messages', messages);

app.get('/', (_, res) => res.json({ message: 'API is running' }));

const PORT = 8000;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend listening on port ${PORT}`));
