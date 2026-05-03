import { gamemanager } from "./store"

export function startLogger() {
  setInterval(() => {
    gamemanager.logger()
  }, 5000)
}
