const keyInput = require('./keyboard-input.js');

// console.time('time');


const RPS = (playerType) => {

	// array = x x x  x x x  x x x  => ' ' | 'X/Y' => display to the board
	let status = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
	const board = 'X | X | X\n---------\nX | X | X\n---------\nX | X | X';
	const message = 'Input X and Y position (0-2)';


	console.log(message);
	keyInput();
} 

RPS('O');

// console.timeLog('time');
