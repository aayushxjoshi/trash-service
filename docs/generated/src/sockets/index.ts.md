# Chat Socket Server Documentation

The `src/sockets/index.ts` file implements a real-time chat server using **Express** and **Socket.io**. It manages user presence, message history, and real-time communication events.

## Overview
This server acts as the backend for a chat application, providing both REST endpoints for initial data fetching and WebSocket events for real-time interaction.

## Key Components

### State Management
*   **`users` (Map<string, string>)**: Tracks connected users by mapping their `socket.id` to their chosen `username`.
*   **`messages` (Array)**: Stores the last 50 messages to provide context to new or reconnecting clients.

### REST API Endpoints
*   `GET /`: Health check endpoint.
*   `GET /messages`: Returns the current message history.
*   `GET /users`: Returns a list of all currently connected usernames.

### WebSocket Events
The server listens for the following client-side events:

| Event | Description |
| :--- | :--- |
| `join` | Registers a user with a username and notifies others of their arrival. |
| `message` | Receives a text message, stores it in history, and broadcasts it to all clients. |
| `typing` | Broadcasts a "typing" notification to all clients except the sender. |
| `disconnect` | Removes the user from the `users` map and notifies others of their departure. |

## Implementation Details

### Message Persistence
The server maintains a rolling buffer of the most recent 50 messages. When a new message is added, the oldest message is removed if the limit is exceeded:
```typescript
if (messages.length > 50) {
  messages.shift();
}
```

### Real-time Broadcasting
*   **`io.emit`**: Used for global events (e.g., new messages, system notifications, user list updates).
*   **`socket.broadcast.emit`**: Used for targeted events (e.g., typing indicators) to notify everyone except the user performing the action.

## Usage
The server is configured to listen on port **3000** with CORS enabled for all origins (`*`), allowing cross-origin requests from frontend clients.

To start the server:
```bash
ts-node src/sockets/index.ts
```

*Note: This implementation is designed for development and testing purposes. For production, consider implementing persistent storage (e.g., Redis or MongoDB) for message history and user sessions.*