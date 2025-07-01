import { Component } from '@angular/core';

@Component({
  selector: 'app-tic-tac-board',
  templateUrl: './tic-tac-board.html',
  styleUrls: ['./tic-tac-board.scss']
})
export class TicTacBoard {
  // This array represents the 3x3 game board, initialized with 9 empty cells
  board: string[] = ['', '', '', '', '', '', '', '', ''];

  // Choose randomly whether player X or O goes first
  currentPlayer: 'X' | 'O' = Math.random() < 0.5 ? 'X' : 'O';

  // This variable stores the winner — 'X', 'O', 'Draw', or null if still playing
  winner: 'X' | 'O' | 'Draw' | null = null;

  // If there's a winner, store the 3 cell indexes to highlight the winning line
  winningLine: number[] = [];

  // This flag prevents players from clicking after the game has ended
  gameOver: boolean = false;

  // These are the score counters for both players and draws
  scoreX: number = 0;
  scoreO: number = 0;
  draws: number = 0;

  // Count how many games have been played so far
  totalGames: number = 0;

  // Set the maximum number of rounds allowed (e.g. Best of 5)
  maxGames: number = 5;

  // Define all possible winning combinations by their board index positions
  winCombi = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  // This function runs when a player clicks a cell
  handleSwitchClick(index: number) {
    // Stop if the cell is already filled, the game is over, or max rounds are reached
    if (this.board[index] || this.gameOver || this.totalGames >= this.maxGames) return;

    // Fill the clicked cell with the current player's mark (X or O)
    this.board[index] = this.currentPlayer;

    // Check if the current move wins the game
    if (this.checkWinner()) {
      this.winner = this.currentPlayer;
      this.gameOver = true;
      this.updateScore(this.currentPlayer);
    }
    // If no winner, check if all cells are filled = it's a draw
    else if (this.board.every(cell => cell !== '')) {
      this.winner = 'Draw';
      this.gameOver = true;
      this.updateScore('Draw');
    }
    // switch to the next player or vice versa
    else {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  // This function checks if there's a winning combination on the board
  checkWinner(): boolean {
    for (let combination of this.winCombi) {
      const [boardIndex1, boardIndex2, boardIndex3] = combination;

      // If all 3 cells have the same mark (and not empty), we have a winner
      if (
        this.board[boardIndex1] &&
        this.board[boardIndex1] === this.board[boardIndex2] &&
        this.board[boardIndex1] === this.board[boardIndex3]
      ) {
        this.winningLine = [boardIndex1, boardIndex2, boardIndex3];
        return true;
      }
    }
    return false; // No winning line found
  }

  // This updates the score based on the winner
  updateScore(result: 'X' | 'O' | 'Draw') {
    // Do not increase score if max number of games is already reached
    if (this.totalGames >= this.maxGames) return;

    // Add score to the appropriate player or draw counter
    if (result === 'X') this.scoreX++;
    else if (result === 'O') this.scoreO++;
    else this.draws++;

    // Increase the total games played
    this.totalGames++;
  }

  // This resets the board for the next round (but keeps scores)
  resetGame() {
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.winner = null;
    this.gameOver = false;
    this.currentPlayer = Math.random() < 0.5 ? 'X' : 'O';
    this.winningLine = [];
  }

  // This resets everything — board, scores, games, and winner
  resetAll() {
    this.resetGame();
    this.scoreX = 0;
    this.scoreO = 0;
    this.draws = 0;
    this.totalGames = 0;
  }

  // This gets the progress bar width based on how many games have been played
  get progressPercent(): string {
    const percent = (this.totalGames / this.maxGames) * 100;
    return percent + '%';
  }
}
