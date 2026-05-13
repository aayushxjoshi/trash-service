import { createClient } from "redis";

const redisClient = createClient();

async function main() {
  await redisClient.connect();

  const consumer = 'worker-1'
  while (true) {
    const response = await redisClient.xReadGroup(
      'workers',
      consumer,
      {
        key: 'orders',
        id: '>'
      },
      {
        COUNT: 1,
        BLOCK: 5000
      }
    ) as Array<{
      name: string,
      messages: Array<{
        id: string,
        message: Record<string, string>
      }>
    }> | null

    if (!response) {
      console.log("Waiting for Messages..")
      continue
    }

    const messages = response[0]?.messages;

    if (!messages) {
      console.error("No Message Found")
      continue
    }

    for (const message of messages) {
      console.log("\nReceived:");
      console.log(message)

      console.log('Processing Event')

      await new Promise((r) => setTimeout(r, 3000));

      await redisClient.xAck(
        'orders',
        'workers',
        message.id
      )

      console.log("ACKN", message.id)
    }
  }
}

main()
