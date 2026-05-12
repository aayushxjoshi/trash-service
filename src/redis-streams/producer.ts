import { createClient } from "redis";

const client = createClient();

async function main() {
  await client.connect();

  for (let i = 1; i <= 10; i++) {
    const id = await client.xAdd("orders", "*", {
      orderId: `${i}`,
      user: `user-${i}`,
      amount: `${i * 100}`,
    });

    console.log(`Added message ${id}`);
  }

  await client.quit();
}

main();
