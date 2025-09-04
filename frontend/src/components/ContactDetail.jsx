import { useState, useEffect } from 'react';
import MessageGenerator from './MessageGenerator';
import MessageHistory from './MessageHistory';

function ContactDetail({ contact }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch(`/messages/${contact.id}`)
      .then(res => res.json())
      .then(setMessages);
  }, [contact]);

  return (
    <div className="flex flex-col bg-white rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-2">{contact.name}</h2>
      <p className="text-gray-600 mb-4">
        {contact.role} @ <span className="font-medium">{contact.company}</span>
      </p>

      <MessageGenerator
        contact={contact}
        onNewMessage={msg => setMessages([msg, ...messages])}
      />

      <MessageHistory messages={messages} />
    </div>
  );
}

export default ContactDetail;
