interface Game {
  id: string
  whitePlayerName: string
  BlackPlayerName: string
  moves: string[]
}

export class GameManager {
  games: Game[] = [];

  constructor() {
    this.games = []
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

export const gamemanager = new GameManager();
