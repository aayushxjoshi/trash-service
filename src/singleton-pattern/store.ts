interface Game {
  id: string
  whitePlayerName: string
  BlackPlayerName: string
  moves: string[]
}

export class GameManager {
  games: Game[] = [];

  private static instance: GameManager;

  private constructor() {
    this.games = []
  }

  static getInstance() {
    // Here is the main thig we check if game manage instance exist if it exist we return it else new instance
    if (GameManager.instance) {
      return GameManager.instance
    }

    GameManager.instance = new GameManager();
    return GameManager.instance
  }

  addMove(gameId: string, move: string) {
    console.log(`Adding mvoe ${move} to game ${gameId}`)
    const game = this.games.find(game => game.id === gameId)
    game?.moves.push(move)
  }

  addgame(gameId: string) {
    const game = {
      id: gameId,
      whitePlayerName: "Aayush",
      BlackPlayerName: "Joshi",
      moves: []
    }
    this.games.push(game)
  }

  logger() {
    console.log(this.games)
  }
}

export const gamemanager = GameManager.getInstance();
