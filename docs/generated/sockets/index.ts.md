# Chat Server Documentation (`sockets/index.ts`)

## Overview
This file implements a real-time chat server using `express` and `socket.io`. It manages user sessions, message history, and real-time event broadcasting, including typing indicators and system notifications.

## API Endpoints
The server provides standard HTTP endpoints for retrieving current state:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Health check; returns "Chat server running". |
| `GET` | `/messages` | Returns the last 50 messages as a JSON array. |
| `GET` | `/users` | Returns a list of currently connected usernames. |

## Socket.io Events

### Client-to-Server Events
*   **`join`**: Registers a user with a `username`. Triggers a system broadcast and updates the active user list.
*   **`message`**: Receives a text string, attaches the sender's username and timestamp, and broadcasts it to all clients. Maintains a rolling buffer of the last 50 messages.
*   **`typing`**: Broadcasts a "typing" notification to all clients *except* the sender.
*   **`disconnect`**: Removes the user from the session map and notifies all clients of the departure.

### Server-to-Client Events
*   **`message`**: Emits a message object `{ user, text, time }` to all clients.
*   **`system`**: Emits status updates (e.g., "User joined/left").
*   **`users`**: Emits the updated list of active usernames.
*   **`typing`**: Emits a notification string indicating a user is currently typing.

## State Management
*   **`users`**: A `Map<string, string>` storing `socket.id` as the key and `username` as the value.
*   **`messages`**: An array storing the last 50 message objects. Older messages are removed using `Array.shift()` to prevent memory overflow.

## Usage Example

### Joining and Messaging
```javascript
const socket = io("http://localhost:3000");

// Join the chat
socket.emit("join", "Alice");

// Listen for messages
socket.on("message", (msg) => {
  console.log(`${msg.user} [${msg.time}]: ${msg.text}`);
});

// Send a message
socket.emit("message", "Hello everyone!");

// Notify others you are typing
socket.emit("typing");
```

### Configuration
*   **Port**: 3000
*   **CORS**: Enabled for all origins (`*`).