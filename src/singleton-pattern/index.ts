import { GameManager } from "./store";
import { startLogger } from "./logger";

startLogger()

setInterval(() => {
  GameManager.getInstance().addgame(Math.random().toString())
}, 5000)
