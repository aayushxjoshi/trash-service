# Redis Stream Inspection Utility

The `src/redis-streams/inspect.ts` script is a diagnostic tool used to monitor the state of a Redis Stream consumer group. It provides visibility into messages that have been delivered to consumers but have not yet been acknowledged.

## Purpose
In a Redis Stream architecture (as implemented in the `producer.ts` and `consumer.ts` files), messages remain in a "pending" state between the time they are read by a consumer and the time they are acknowledged via `xAck`. This script allows developers to inspect the `PENDING` entries list for a specific stream and consumer group to identify stalled or unacknowledged tasks.

## Key Functionality
- **`xPending`**: Utilizes the Redis `XPENDING` command to retrieve summary information about the consumer group `workers` on the stream `orders`.
- **Diagnostic Output**: Logs the pending message count, the range of message IDs, and the consumers currently holding unacknowledged messages.

## Usage

Ensure your Redis server is running, then execute the script using `ts-node` or your preferred runner:

```bash
npx ts-node src/redis-streams/inspect.ts
```

### Expected Output
The script will output an object containing:
- `pending`: Total number of pending messages.
- `minId`: The smallest message ID currently pending.
- `maxId`: The largest message ID currently pending.
- `consumerMessageCount`: An array detailing how many pending messages are assigned to each specific consumer.

## Integration
This utility is part of a suite of Redis Stream management scripts:
*   **`producer.ts`**: Populates the `orders` stream.
*   **`consumer.ts`**: Processes messages and performs the `xAck` operation.
*   **`recover.ts`**: Uses `xClaim` to reassign messages that have been pending for too long, often identified using the data provided by this `inspect.ts` script.