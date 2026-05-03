import { PubSubManager } from "./PubSubManager";
import { createClient } from "redis";

async function main() {
  const pubsub = PubSubManager.getInstance();

  pubsub.userSubscribe("User1", "APPLE")
  pubsub.userSubscribe("User2", "APPLE")

  setTimeout(async () => {
    const publisher = createClient()
    await publisher.connect()

    await publisher.publish("APPLE", `Stock Price Updated to Price: ${Math.random().toString()}`)

    await publisher.quit()
  }, 2000)

  setTimeout(() => {
    pubsub.userUnsubscribe("User1", "APPLE")
    pubsub.userUnsubscribe("User2", "APPLE")
  }, 5000)
}

main()
