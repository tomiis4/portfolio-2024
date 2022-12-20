console.time('time');

// Input settings
const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

// get index function
const getIndex = (xPosition, yPosition, width) => {
	return (width * (yPosition)) + (xPosition);	
}

// Generate board
const getBoard = (statusArray) => {
	let finalBoard = '';

	finalBoard += `\n-------------\n`;
	for (let i=0; i<9; i++) {
		const separate = i % 3;
		
		finalBoard += `| ${statusArray[i]} `;
		if (separate == 2) {
			finalBoard += `|\n-------------\n`;
		}
	}
	console.log(finalBoard);
}


// Tic-Tac-Toe
const TTT = (playerType) => {
	//TTT settings
	let status = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
	const messages = {
		keyInput: 'Input X and Y position (0-2)'
	}
	console.log(messages.keyInput);

	// Key settings
	let keysInputed = [];
	let currentKey;
	// Capture key
	stdin.on('data', (key) => {
		currentKey = parseInt(key);

		// If key is 0-2 then push to the array
		if (keysInputed.length <= 2 && currentKey <= 2 && currentKey >=0) {
			keysInputed.push(currentKey);

			// if is inputed 2 correct values
			if (keysInputed.length == 2) {
				const currentIndex = getIndex(keysInputed[0], keysInputed[1], 3);
				
				// if the point is available.
				if (status[currentIndex] == ' ') {
					status[currentIndex] = playerType;
				
					getBoard(status);
				} else {
					console.log("Sorry, next time :D");
				}
				process.exit();
			}
		}
	})
} 

TTT('X');

console.timeLog('time');
