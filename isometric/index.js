// constant variables
const container = document.getElementById('game-container');
const playerWidth = 100;
const blockWidth = 150;
const boardArray = [
	// [0,0, 'spawn-point'], [1,0], [2,0], [3,0], [4,0], [5,0],
	// [0,1], [1,1], [2,1], [3,1], [4,1], [5,1],
	// [0,2], [1,2], [2,2], [3,2], [4,2], [5,2],
	// [0,3], [1,3], [2,3], [3,3], [4,3], [5,3],
	// [0,4], [1,4], [2,4], [3,4], [4,4], [5,4],
	// [0,5], [1,5], [2,5], [3,5], [4,5], [5,5, 'end-point'],

	[0, 0, 'spawn-point'], [1, 0], [2, 0],
	[2, 1],
	[2, 2],
	[2, 3], [3, 3],
	[3, 4], [4, 4, 'end-point'],
];

// mutable variables
let playerPosition = [];
let endPoint = [];


// uilts

// get x,y position in pixels trough 2d matrix
// arguments: array of 2D pixels and item width
const getPosition = (array, width) => {
	// calculate position and scale it to the block size
	const getX = (array[0] * 1 + array[1] * -1) * (width / 2);
	const getY = (array[0] * 0.5 + array[1] * 0.5) * (width / 2);

	return [getX, getY];
}

// insert element to the container
const insertElement = (type, xPos, yPos, array) => {
	const brickEl = `<img 
		style="margin-left: ${xPos}px; top: ${yPos}px"
		src="./images/block.png" 
		id="brick"
	>`;
	const specialEl = `<img 
		style="margin-left: ${xPos}px; top: ${yPos}px"
		src="./images/special-block.png" 
		id="special"
	>`;
	const playerEl = `<img
		style="margin-left: ${xPos}px; top: ${yPos - (playerWidth / 2)}px"
		src="./images/player.png" 
		id="player"
	>`;

	switch (type) {
		case 'spawn':
			container.innerHTML += specialEl;
			container.innerHTML += playerEl;
			playerPosition[0] = array[0];
			playerPosition[1] = array[1];
			break;
		case 'end':
			container.innerHTML += specialEl;
			endPoint = array;
			break;
		case 'brick':
			container.innerHTML += brickEl;
			break;
		default:
			console.log(`Wrong type ${type}`);
	}
}


const generateBoard = () => {
	boardArray.forEach((array) => {
		const xPosition = getPosition(array, blockWidth)[0]; 
		const yPosition = getPosition(array, blockWidth)[1] + blockWidth * 2.5;

		const getBlockType = array[2] == 'spawn-point' ? 'spawn'
			: array[2] == 'end-point' ? 'end'
			: array[2] == undefined ? 'brick'
			: 'other';
		
		insertElement(getBlockType, xPosition, yPosition, array);
	})
}

const movePlayer = (direction) => {
	const previousPosition = playerPosition.slice();
	
	let isValid = [];

	switch (direction) {
		case 'up':
			playerPosition[0]--;
			break;
		case 'down':
			playerPosition[0]++;
			break;
		case 'left':
			playerPosition[1]++;
			break;
		case 'right':
			playerPosition[1]--;
			break;
		default:
			console.log(`Wrong direction: ${direction}`)
	}
	
	boardArray.forEach((array) => {
		if (array[0] == playerPosition[0] && array[1] == playerPosition[1]) {
			isValid.push(true);
		} else {
			isValid.push(false);
		}
	})
	
	if (!isValid.includes(true)) {
		console.log('Wrong')
		playerPosition = previousPosition;
	} else {
		console.log('corre')
	}
	
	const player = document.getElementById('player');
	const getPlayerPosition = getPosition(playerPosition, blockWidth);
	const xPos = getPlayerPosition[0];
	const yPos = getPlayerPosition[1];

	player.style.marginLeft = `${xPos}px`;
	player.style.marginTop = `${yPos}px`;
}

const keyPress = (e) => {
	switch (e.key) {
		case 'w':
			movePlayer('up');
			break;
		case 's':
			movePlayer('down');
			break;
		case 'a':
			movePlayer('left');
			break;
		case 'd':
			movePlayer('right');
			break;
		default: 
			return;
	}
}
document.body.addEventListener("keypress", keyPress);
