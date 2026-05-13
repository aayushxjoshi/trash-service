import { createClient } from "redis";

const redisClient = createClient()

async function main() {
  await redisClient.connect()

  const response = await redisClient.xPending(
    'orders',
    'workers'
  )

  console.log("PENDING", response)

  await redisClient.quit()
}

main()
