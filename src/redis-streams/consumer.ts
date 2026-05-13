const { createClient } = require("redis");

const client = createClient();

async function main() {
  await client.connect();

  const consumerName = "worker-1";

  while (true) {
    const response = await client.xReadGroup(
      "workers",
      consumerName,
      {
        key: "orders",
        id: ">"
      },
      {
        COUNT: 1,
        BLOCK: 5000
      }
    );

    if (!response) {
      console.log("Waiting for messages...");
      continue;
    }

    const messages = response[0].messages;

    for (const message of messages) {
      console.log("\nReceived:");
      console.log(message);

      console.log("Processing order...");

      await new Promise((r) => setTimeout(r, 3000));

      await client.xAck(
        "orders",
        "workers",
        message.id
      );

      console.log(`ACKED ${message.id}`);
    }
  }
}

main();
