import { createGame } from 'thomas-anderson-lib';

// Create a new game instance
const game = createGame();

// Process commands and get responses
const response = game.processCommand('look');




console.log(response.message);

// Check the game state
console.log(`Score: ${game.getScore()}`);
console.log(`Game Over: ${game.isGameOver()}`);