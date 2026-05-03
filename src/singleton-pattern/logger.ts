import { GameManager } from "./store"

export function startLogger() {
  setInterval(() => {
    GameManager.getInstance().logger()
  }, 5000)
}
