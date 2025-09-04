function MessageHistory({ messages }) {
  return (
    <div>
      <h3>Previous Messages</h3>
      {messages.map(msg => (
        <div key={msg.id}>
          <strong>{msg.type}</strong> – {new Date(msg.generated_at).toLocaleString()}
          <p>{msg.content}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageHistory;