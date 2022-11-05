//     VARIABLES     //


// Constants

// DOM elements
const container = document.getElementById('game-container');
const score = document.getElementById('score');

// player informations
const imagePath = './images/'
const playerWidth = 100;
const blockWidth = 150;

// board
const boardArray = [
	[0,0, 'spawn-point'], [1,0], [2,0], [3,0], [4,0], [5,0],
	[0,1], [1,1, 'spike'], [2,1], [3,1], [4,1], [5,1],
	[0,2], [1,2], [2,2, 'reward-point'], [3,2], [4,2], [5,2],
	[0,3], [1,3], [2,3], [3,3], [4,3, 'spike'], [5,3],
	[0,4, 'reward-point'], [1,4], [2,4], [3,4], [4,4], [5,4],
	[0,5], [1,5], [2,5], [3,5], [4,5], [5,5, 'end-point'],
];


// Mutable

// player
let playerPosition = [];

// board
let endPoint = [];
let collectedPoints = 0;
let collectedPointsArray = [];

// obstacles
let isSpikeOn;


//     UILTS     //


// Delay

const delay = (ms) => {
	return new Promise(res => setTimeout(res, ms));
}

// Get position

// arguments 2d array and block width px
// return x,y in pixels
const getPosition = (array, width) => {
	// calculate position and scale it to the block size
	const getX = (array[0] * 1 + array[1] * -1) * (width / 2);
	const getY = (array[0] * 0.5 + array[1] * 0.5) * (width / 2);
	
	return [getX, getY];
}

// Set score

// arguments score, isCustom
const setScore = (scoreVal, isCustom) => {
	if (isCustom) {
		score.innerText = scoreVal;
	} else {
		score.innerText = `Score: ${scoreVal}`;
	}
}

// Insert element

// arguments type of element, x,y position in px, 2d array
const insertElement = ({type, xPos, yPos, array}) => {
	const elements = {
		brick: `<img 
			style="margin-left: ${xPos}px; top: ${yPos}px"
			src="${imagePath}block.png" 
			id="brick"
			>`,
		special: `<img 
			style="margin-left: ${xPos}px; top: ${yPos}px"
			src="${imagePath}special-block.png" 
			id="special"
			>`,
		reward: `<img 
			style="margin-left: ${xPos}px; top: ${yPos}px"
			src="${imagePath}reward-block.png" 
			id="reward"
			>`,
		spike: `<img 
			style="margin-left: ${xPos}px; top: ${yPos}px"
			src="${imagePath}spike-0.png" 
			id="spike"
			>`,	
		player: `<img
			style="margin-left: ${xPos}px; top: ${yPos - (playerWidth / 2)}px"
			src="${imagePath}player-v3.png" 
			id="player"
			>`,
	};

	// check type
	switch (type) {
		// blocks
		case 'spawn':
			container.innerHTML += elements.special;
			container.innerHTML += elements.player;
			// playerPosotion = array;
			playerPosition[0] = array[0];
			playerPosition[1] = array[1];
			break;	
		case 'end':
			container.innerHTML += elements.special;
			endPoint = array;
			break;	
		case 'reward':
			container.innerHTML += elements.reward;
			break;
		case 'brick':
			container.innerHTML += elements.brick;
			break;
		
		// obstacles
		case 'spike':
			container.innerHTML += elements.spike;
			break;
		
		// default
		default:
			console.log(`Wrong type ${type}`);
	}
}

// Check lose

const checkLose = () => {
	if (collectedPoints <= -1) {
		setScore('You lost', 1);
	}
}

// Check win

const checkWin = () => {
	let allPoints = 0;

	boardArray.forEach((arr) => {
		// get all points
		if (arr[2] == 'reward-point') {
			allPoints++;
		}
		
		if (
			arr[2] == 'end-point'
			
			&& arr[0] == playerPosition[0]
			&& arr[1] == playerPosition[1]
			
			&& allPoints == collectedPoints
		) {
			setScore('You won', 1);
		}
	})
}

// Check obstacle

const checkObstacle = () => {
	boardArray.forEach((arr) => {
		if (
			arr[2] == 'spike' // add move in future
			&& arr[0] == playerPosition[0] 
			&& arr[1] == playerPosition[1]
			&& isSpikeOn == true // 
		) {
			collectedPoints--;
			setScore(collectedPoints);
		}
	})
}

// Reset game

const resetGame = () => {
	// reset variables
	playerPosition = [];
	endPoint = [];
	collectedPoints = 0;
	collectedPointsArray = [];
	isSpikeOn = null;
	
	// reset elements
	container.innerHTML = '';
	score.innerText = 'Score: 0';
	
	//activate game
	generateBoard();
}


//     OBSTACLES     //


const obstacles = () => {
	// elements of all obstacles
	const spikesArray = document.querySelectorAll('#spike');

	const spikes = async () => {
		while (true) {
			// switch for spikes
			if (isSpikeOn == true) {
				isSpikeOn = false;

				// set spikes off
				spikesArray.forEach((elem) => {
					elem.src = `${imagePath}spike-0.png`;
				});
			} 
			else {
				isSpikeOn = true;

				// set spikes on
				spikesArray.forEach((elem) => {
					elem.src = `${imagePath}spike-1.png`;
				});
			}
			
			checkObstacle();
			checkLose();
			
			// how fast will spikes change
			await delay(1300);
		}
	}

	// activate obstacles
	spikes();
}


//     GAME MECHANIC	    //


// Generate board

const generateBoard = () => {
	boardArray.forEach((array) => {
		// get position and center 
		const xPosition = getPosition(array, blockWidth)[0];
		const yPosition = getPosition(array, blockWidth)[1] + blockWidth;
		
		// check block type
		// FIXME instead undefined add 'block' to board
		const blockType = array[2] == 'spawn-point' ? 'spawn'
			: array[2] == 'end-point' ? 'end'
			: array[2] == 'reward-point' ? 'reward'
			
			// obstacles
			: array[2] == 'spike' ? 'spike'
			
			// brick
			: array[2] == undefined ? 'brick'
			
			// wrong type
			: 'other'
		
		insertElement({
			type: blockType,
			xPos: xPosition,
			yPos: yPosition,
			array: array
		});
	})
	
	// activate obstacles
	obstacles();
}

// Get point

// arguments player element
const getPoint = (player) => {
	boardArray.forEach((arr) => {
		// get current point
		if (
			arr[2] == 'reward-point'
			&& arr[0] == playerPosition[0] 
			&& arr[1] == playerPosition[1] 
			&& !collectedPointsArray.includes(arr) // if it's not collected
		) {
			// get player state
			const playerState = parseInt(
				player.src.split('')[player.src.split('').length - 5]
			);
			
			// collect points and score
			collectedPoints++;
			collectedPointsArray.push(arr);
			setScore(collectedPoints);
			
			player.src = `${imagePath}player-v${playerState-1}.png`;
		}
		
	});
	
	checkObstacle();
	checkWin();
	checkLose();
}

// Move player

const movePlayer = (direction) => {
	// duplicate array
	const previousPosition = playerPosition.slice();
	
	let isValid = [];

	// get direction and then count it using 2D array
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
	
	// check if move was valid (if player move is in the array )
	boardArray.forEach((array) => {
		if (
			array[0] == playerPosition[0] 
			&& array[1] == playerPosition[1]
		) {
			isValid.push(true);
		} else {
			isValid.push(false);
		}
	})
	
	if (!isValid.includes(true)) {
		playerPosition = previousPosition;
	}
	
	// move player
	const player = document.getElementById('player');
	const getPlayerPosition = getPosition(playerPosition, blockWidth);
	const xPos = getPlayerPosition[0];
	const yPos = getPlayerPosition[1];
	
	player.style.marginLeft = `${xPos}px`;
	player.style.marginTop = `${yPos}px`;

	getPoint(player);
}


//     CONTROLS     //


// Keypress

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

// activate
document.body.addEventListener("keypress", keyPress);
