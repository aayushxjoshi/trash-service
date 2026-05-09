# WebSocket Chat Server

The `sockets/index.ts` file implements a real-time chat server using [Express](https://expressjs.com/) and [Socket.io](https://socket.io/). It provides a lightweight infrastructure for broadcasting messages to all connected clients.

## Overview

This server initializes an HTTP server wrapped with Socket.io to handle bidirectional communication. It is configured to allow cross-origin requests (`CORS: *`), making it accessible from various frontend environments.

## Key Functionality

### Connection Handling
- **`connection`**: Triggered when a client establishes a connection. The server logs the unique `socket.id` to the console.
- **`disconnect`**: Triggered when a client closes the connection, logging the disconnection event.

### Messaging
- **`message` event**: Listens for incoming messages from clients.
- **Broadcasting**: Upon receiving a message, the server emits a `message` event to **all** connected clients containing:
    - `id`: The sender's socket ID.
    - `text`: The message content.
    - `time`: A timestamp of when the message was processed.

## Server Configuration

| Property | Value | Description |
| :--- | :--- | :--- |
| **Port** | 3000 | The port on which the server listens. |
| **CORS** | `*` | Allows requests from any origin. |
| **Health Check** | `GET /` | Returns "Chat server running" to verify connectivity. |

## Usage Example

To interact with this server, connect a Socket.io client to `http://localhost:3000`:

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

// Send a message
socket.emit("message", "Hello, world!");

// Listen for incoming messages
socket.on("message", (data) => {
  console.log(`New message from ${data.id}: ${data.text} at ${data.time}`);
});
```

## Dependencies
- `express`: Web framework for the HTTP server.
- `http`: Node.js built-in module to create the server instance.
- `socket.io`: Library for real-time, bidirectional event-based communication.