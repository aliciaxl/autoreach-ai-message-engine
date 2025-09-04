# Detailed Requirements

## User Stories

### As a user, I want to:
1. Add and manage my contacts with relevant information
2. Generate personalized outreach messages based on contact details
3. Choose different types of messages (intro, follow-up, meeting request)
4. View and edit generated messages before "sending"
5. See the history of messages for each contact

## API Endpoints (Suggested)

Your API should support operations like:
- Contact management (CRUD)
- Message generation (using Ollama)
- Message history retrieval
- Message storage

## Data Model Considerations

Think about:
- What information do you need to store about contacts?
- How will you structure conversation history?
- What metadata is important for messages?

## Ollama Integration

- Use Ollama's REST API (typically runs on port 11434)
- Choose an appropriate model (llama3.2, mistral, etc.)
- Consider prompt engineering for better results
- Handle API errors gracefully

## Example User Flow

1. User adds a new contact "Jane Smith, CTO at TechCorp"
2. User selects "Generate Introduction Message"
3. System generates: "Hi Jane, I noticed you're leading technology initiatives at TechCorp..."
4. User can edit the message
5. Message is saved to history
6. User can later generate a follow-up

## Bonus Features (If Time Permits)

Pick 1-2 if you finish early:
- Bulk message generation for multiple contacts
- Message templates/snippets
- Sentiment analysis of responses
- A/B testing different message styles
- Export functionality (CSV)
- Analytics dashboard
- Real-time generation with streaming

## Important Notes

- **Docker Setup**: Your solution must include a docker-compose.yml that starts everything
- **Models**: You'll need to pull at least one Ollama model (this can be documented in setup instructions)
- **Error Handling**: Handle cases where Ollama is unavailable or returns errors
- **State Management**: Consider how to handle loading states during generation
