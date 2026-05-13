import { response } from "express";
import { createClient } from "redis";

const redisClient = createClient();

async function main() {
  await redisClient.connect()

  const response = await redisClient.xClaim(
    'orders',
    'workers',
    'workers-2',
    5000,
    ["1778611848187 - 0"]
  )

  console.log("CLAIMED", response)

  await redisClient.quit()
}

main()
