import type { RedisClientType } from "@redis/client"
import { createClient } from "redis"

export class PubSubManager {
  private static instance: PubSubManager
  redisClient: RedisClientType
  subscription: Map<string, string[]>

  private constructor() {
    this.redisClient = createClient()
    this.redisClient.connect()
    this.subscription = new Map()
  }

  static getInstance() {
    if (PubSubManager.instance) {
      return PubSubManager.instance
    }
    PubSubManager.instance = new PubSubManager()
    return PubSubManager.instance
  }

  userSubscribe(userId: string, stock: string) {
    if (!this.subscription.has(stock)) {
      this.subscription.set(stock, [])
    }

    this.subscription.get(stock)?.push(userId)

    if (this.subscription.get(stock)?.length === 1) {
      this.redisClient.subscribe(stock, (message) => {
        this.handleMessage(stock, message)
      })
    }
  }

  userUnsubscribe(userId: string, stock: string) {
    const filteredUsed = this.subscription.get(stock)?.filter((user) => user !== userId) || []
    this.subscription.set(stock, filteredUsed)

    if (this.subscription.get(stock)?.length === 0) {
      this.redisClient.unsubscribe(stock)
      console.log(`Unsubscribed to the Redis Channel: ${stock}`)
    }

  }

  handleMessage(stock: string, message: string) {
    console.log(`Message received on channel ${stock}: ${message}`)
    this.subscription.get(stock)?.forEach((user) => {
      console.log(`Sending Message to the user: ${user}`)
    })
  }

  async disconnect() {
    await this.redisClient.quit()
  }
}
