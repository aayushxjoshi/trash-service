# Redis Stream Consumer

The `src/redis-streams/consumer.ts` file implements a persistent consumer for a Redis Stream named `orders`. It utilizes Redis Consumer Groups to ensure reliable message processing, allowing multiple workers to process messages from the same stream without duplication.

## Purpose
This script acts as a worker that continuously polls the `orders` stream for new messages. It processes each message individually and sends an acknowledgment (`XACK`) to Redis upon successful completion, ensuring the message is removed from the Pending Entries List (PEL).

## Key Functionality
*   **Consumer Group Integration**: Uses `xReadGroup` to read messages assigned to the `workers` group.
*   **Blocking Reads**: Implements a 5-second (`5000ms`) block time to minimize CPU usage while waiting for new messages.
*   **Reliable Processing**: Processes messages one by one and explicitly acknowledges them using `xAck`.
*   **Infinite Loop**: The consumer runs indefinitely, maintaining a connection to the Redis stream to handle incoming events in real-time.

## Usage
To run the consumer, ensure you have a Redis server running and the `redis` npm package installed.

```bash
ts-node src/redis-streams/consumer.ts
```

## Workflow
1.  **Connect**: Establishes a connection to the local Redis instance.
2.  **Read**: Polls the `orders` stream for new messages (`id: '>'`) assigned to `worker-2`.
3.  **Process**: Simulates a workload (3-second delay) for each received message.
4.  **Acknowledge**: Sends an `XACK` to the stream to confirm the message has been processed.
5.  **Repeat**: Continues to the next message or waits for new ones.

## Related Components
*   **`producer.ts`**: Populates the `orders` stream with data.
*   **`inspect.ts`**: Used to check the status of pending messages in the `workers` group.
*   **`recover.ts`**: Used to claim messages that were not acknowledged (e.g., if a consumer crashes during processing).