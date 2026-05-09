# WebSocket Chat Server

The `websockets/index.ts` file implements a real-time chat server using Node.js, Express, and Socket.io. It provides a lightweight infrastructure for bidirectional communication between clients.

## Overview

This server initializes an HTTP server wrapped with Socket.io to handle WebSocket connections. It is configured to allow cross-origin requests (`CORS: *`), making it accessible from various client-side environments.

## Key Functionality

*   **Connection Handling**: Logs unique socket IDs when users connect or disconnect.
*   **Message Broadcasting**: Listens for the `message` event from any connected client and broadcasts the message to all connected clients, including the sender.
*   **Payload Structure**: Every broadcasted message includes:
    *   `id`: The sender's unique socket ID.
    *   `text`: The content of the message.
    *   `time`: A timestamp of when the message was received by the server.

## Server Configuration

| Property | Value | Description |
| :--- | :--- | :--- |
| **Port** | 3000 | The port on which the server listens. |
| **CORS** | `*` | Allows requests from any origin. |
| **Health Check** | `GET /` | Returns "Chat server running" to verify server status. |

## Usage

### Starting the Server
Ensure you have the necessary dependencies installed (`express`, `socket.io`), then run the file using `ts-node` or by compiling it to JavaScript:

```bash
node websockets/index.js
```

### Client Integration
To interact with this server, use the `socket.io-client` library:

```javascript
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

// Send a message
socket.emit("message", "Hello, world!");

// Listen for incoming messages
socket.on("message", (data) => {
  console.log(`[${data.time}] ${data.id}: ${data.text}`);
});
```

## Dependencies
*   **Express**: Used to serve the base HTTP server and health check route.
*   **Socket.io**: Manages the WebSocket lifecycle and event-based communication.