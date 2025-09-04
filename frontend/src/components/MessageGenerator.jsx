import { useState } from 'react';

function MessageGenerator({ contact, onNewMessage }) {
  const [type, setType] = useState('intro');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/messages/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contactId: contact.id,
          type: type
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate message');
      }

      const data = await response.json();

      // Add new message to history
      onNewMessage({
        type,
        content: data.message,
        generated_at: new Date().toISOString()
      });
    } catch (err) {
      console.error(err);
      setError('Message generation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Generate Message</h3>
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="intro">Intro</option>
        <option value="follow-up">Follow-Up</option>
        <option value="meeting-request">Meeting Request</option>
      </select>
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default MessageGenerator;
