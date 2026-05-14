# Redis Stream Recovery Utility

The `src/redis-streams/recover.ts` script provides a mechanism to recover orphaned or stalled messages from a Redis Stream consumer group. It utilizes the `XCLAIM` command to reassign ownership of specific pending messages to a new consumer.

## Purpose
In a distributed system using Redis Streams, messages may remain in the "Pending Entries List" (PEL) if a consumer crashes or fails to acknowledge a message after processing. This script allows an administrator or a supervisor process to manually claim these messages, ensuring they are processed by a healthy consumer.

## Key Functionality
- **Message Claiming**: Uses `redisClient.xClaim` to transfer ownership of messages from an unresponsive consumer to a new one.
- **Timeout Enforcement**: Implements a minimum idle time (5000ms) before a message can be claimed, preventing race conditions where a message is claimed while still being processed by the original owner.

## Usage

### Prerequisites
Ensure your Redis server is running and the stream `orders` and consumer group `workers` are already initialized.

### Execution
Run the script using `ts-node` or your preferred TypeScript runner:

```bash
npx ts-node src/redis-streams/recover.ts
```

### Configuration
The script is currently hardcoded to target specific parameters:
*   **Stream Key**: `'orders'`
*   **Consumer Group**: `'workers'`
*   **New Consumer**: `'workers-2'`
*   **Min Idle Time**: `5000` (milliseconds)
*   **Message IDs**: An array of specific message IDs to claim (e.g., `["1778611848187-0"]`).

## Related Components
- **`src/redis-streams/consumer.ts`**: The primary consumer that processes messages and issues `XACK` commands.
- **`src/redis-streams/inspect.ts`**: Used to check the current state of pending messages (`XPENDING`) to identify which IDs need to be recovered.
- **`src/redis-streams/producer.ts`**: Responsible for injecting new messages into the `orders` stream.