// constant variables
const container = document.getElementById('game-container');
const score = document.getElementById('score');

const imagePath = './images/'
const playerWidth = 100;
const blockWidth = 150;

const boardArray = [
	[0,0, 'spawn-point'], [1,0], [2,0], [3,0], [4,0], [5,0],
	[0,1], [1,1, 'spike'], [2,1], [3,1], [4,1], [5,1],
	[0,2], [1,2], [2,2, 'reward-point'], [3,2], [4,2], [5,2],
	[0,3], [1,3], [2,3], [3,3], [4,3, 'spike'], [5,3],
	[0,4, 'reward-point'], [1,4], [2,4], [3,4], [4,4], [5,4],
	[0,5], [1,5], [2,5], [3,5], [4,5], [5,5, 'end-point'],
];

// mutable variables
let playerPosition = [];
let endPoint = [];
let collectedPoints = 0;
let collectedPointsArray = [];
let isSpikeOn;

// uilts

// delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// get x,y position in pixels trough 2d matrix
// arguments: array of 2D pixels and item width
const getPosition = (array, width) => {
	// calculate position and scale it to the block size
	const getX = (array[0] * 1 + array[1] * -1) * (width / 2);
	const getY = (array[0] * 0.5 + array[1] * 0.5) * (width / 2);

	return [getX, getY];
}

const setScore = (value, isCustom) => {
	isCustom == 1 ? score.innerText = value : score.innerText = `Score: ${value}`;
}

// insert element to the container
const insertElement = (type, xPos, yPos, array) => {
	const brickEl = `<img 
		style="margin-left: ${xPos}px; top: ${yPos}px"
		src="${imagePath}block.png" 
		id="brick"
	>`;
	
	const specialEl = `<img 
		style="margin-left: ${xPos}px; top: ${yPos}px"
		src="${imagePath}special-block.png" 
		id="special"
	>`;
	const rewardEl = `<img 
		style="margin-left: ${xPos}px; top: ${yPos}px"
		src="${imagePath}reward-block.png" 
		id="reward"
	>`;

	const spikeEl = `<img 
		style="margin-left: ${xPos}px; top: ${yPos}px"
		src="${imagePath}spike-0.png" 
		id="spike"
	>`;
	
	const playerEl = `
		<img
			style="margin-left: ${xPos}px; top: ${yPos - (playerWidth / 2)}px"
			src="${imagePath}player-v3.png" 
			id="player"
		>`;

	// check what type of block is it and add it to the container
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
		case 'reward':
			container.innerHTML += rewardEl;
			break;
		case 'brick':
			container.innerHTML += brickEl;
			break;
		case 'spike':
			container.innerHTML += spikeEl;
			break;
		default:
			console.log(`Wrong type ${type}`);
	}
}

const checkLose = () => {
	if (collectedPoints <= -1) {
		setScore('You lost', 1);
	}
}


const obstacles = () => {
	const spikeArray = document.querySelectorAll('#spike');
	
	const spikes = async () => {
		for (;;) {
			// move spike up/down
			if (isSpikeOn == true) {
				isSpikeOn = false;
				
				spikeArray.forEach((elem) => {
					elem.src = `${imagePath}spike-0.png`;
				})
			} else {
				isSpikeOn = true;
				
				spikeArray.forEach((elem) => {
					elem.src = `${imagePath}spike-1.png`;
				})
			}
			
			await delay(1300);
		}
	}

	spikes();
} 

const generateBoard = () => {
	boardArray.forEach((array) => {
		const xPosition = getPosition(array, blockWidth)[0]; 
		const yPosition = getPosition(array, blockWidth)[1] + blockWidth * 2.5;

		// check what type of the block is it
		//TODO add type to the block instead of the undefined 
		const getBlockType = array[2] == 'spawn-point' ? 'spawn'
			: array[2] == 'end-point' ? 'end'
			: array[2] == 'reward-point' ? 'reward'
			
			: array[2] == 'spike' ? 'spike'
			
			: array[2] == undefined ? 'brick'
			: 'other';
		
		insertElement(getBlockType, xPosition, yPosition, array);
	})
	
	obstacles();
}

const getPoint = (player) => {
	let allPoints = 0;

 	// get all points
	boardArray.forEach((value) => {
		if (value[2] == 'reward-point') {
			allPoints++;
		}
	})
	
	// get current point 
	boardArray.forEach((arr) => {
		// check score
		if (
			arr[2] == 'reward-point' && arr[0] == playerPosition[0] 
			&& arr[1] == playerPosition[1] 
			&& !collectedPointsArray.includes(arr)
		) {
			const playerVersion = parseInt(player.src.split('')[player.src.split('').length-5]);

			collectedPoints++;
			collectedPointsArray.push(arr);

			setScore(collectedPoints);
			player.src = `./images/player-v${playerVersion-1}.png`;
		}
		
		// check win
		if (
			arr[2] == 'end-point' && arr[0] == playerPosition[0] 
			&& arr[1] == playerPosition[1] 
			&& allPoints == collectedPoints
		) {
			setScore('You won!', 1)
			console.log('You won!');
		}
	})

	checkLose();
}

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
		if (array[0] == playerPosition[0] && array[1] == playerPosition[1]) {
			isValid.push(true);
		} else {
			isValid.push(false);
		}
	})
	
	if (!isValid.includes(true)) {
		playerPosition = previousPosition;
	}
	
	const player = document.getElementById('player');
	const getPlayerPosition = getPosition(playerPosition, blockWidth);
	const xPos = getPlayerPosition[0];
	const yPos = getPlayerPosition[1];

	player.style.marginLeft = `${xPos}px`;
	player.style.marginTop = `${yPos}px`;

	getPoint(player);

	// check if he stepped on the spike
	boardArray.forEach((arr) => {
		if (
			arr[2] == 'spike' 
			&& arr[0] == playerPosition[0] 
			&& arr[1] == playerPosition[1]
			&& isSpikeOn == true // i don't need that
		) {
			collectedPoints--;
			setScore(collectedPoints);
		}
	})
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
