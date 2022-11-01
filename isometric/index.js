const container = document.getElementById('container');
const board = [
	[0, 0, 'point'], [1, 0], [2, 0],
	[2, 1],
	[2, 2],
	[2, 3], [3, 3],
	[3, 4], [4, 4, 'end-point'],

	[0,0, 'player']
];
const height = 100;
let playerPosition = []

const getPosition = (arr) => {
	const calcX = (arr[0] * 1 + arr[1] * -1) * (height / 2);
	const calcY = (arr[0] * 0.5 + arr[1] * 0.5) * (height / 2);

	return [calcX, calcY]
}


for (let i=0; i<board.length; i++) {
	const x = getPosition(board[i])[0] + height * 2;
	const y = getPosition(board[i])[1] + height;

	const type = board[i][2] == 'point' || board[i][2] == 'end-point' ? 'border' 
		: board[i][2] == 'player' ? 'player'
		: 'grass';

	const elementBlock = `<div style="top: ${y}px; left: ${x}px" id="${type}"></div>`;
	
	playerPosition = [board[i][0], board[i][1]];

	const elementPlayer = `<div style="top: ${y - 75/2}px; left: ${x + ((100 - 75) / 2)}px" id="${type}"></div>`;


	if (type == 'player') {
		container.innerHTML += elementPlayer;

	} else {
		container.innerHTML += elementBlock;
	}
}

const isWin = () => {
	board.forEach((arr) => {
		if (playerPosition[0] == arr[0] && playerPosition[1] == arr[1] && arr[2] == 'end-point') {
			document.body.removeEventListener("keypress", keyPress);
			container.innerHTML = '<h1 id="win"> You won! </h1>'
			console.log("WIN");
		}
	})
}

const movePlayer = (direction) => {
	const player = document.getElementById('player');
	const playerHeight = 75;
	
	const duplicatePlayer = playerPosition.slice();
	let isAllowed = [];
	isAllowed = [];

	switch (direction) {
		case 'left':
			playerPosition[1]++;
			break;
		case 'right':
			playerPosition[1]--;
			break;
		case 'top':
			playerPosition[0]--;
			break;
		case 'bottom':
			playerPosition[0]++;
			break;
		default:
			console.log('Wrong direction');
	}
	
	if (!board.some((arr) => {
		if (arr[0] == playerPosition[0] && arr[1] == playerPosition[1] && arr[2] != 'player') {
			return true
		}
	})) {
		console.log('Border')
		playerPosition = duplicatePlayer;
	}


	const newPosition = getPosition(playerPosition);
	const x = (newPosition[0] + height * 2) + ((100 - playerHeight) / 2);
	const y = (newPosition[1] + height) - playerHeight/2;

	player.style.top = `${y}px`;
	player.style.left = `${x}px`;

	isWin();
}

const keyPress = (e) => {
	switch (e.key) {
		case 'w':
			movePlayer('top');
			break;
		case 's':
			movePlayer('bottom');
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
