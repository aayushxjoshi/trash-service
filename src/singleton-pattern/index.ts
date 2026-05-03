import { gamemanager } from "./store";
import { startLogger } from "./logger";

startLogger()

setInterval(() => {
  gamemanager.addgame(Math.random().toString())
}, 5000)
