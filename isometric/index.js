//     VARIABLES     //


// Constants

// DOM elements
const container = document.getElementById('game-container');
const score = document.getElementById('score');

// player informations
const imagePath = './images/'
const blockWidth = 130; // 130
const playerWidth = blockWidth / 2;

// board
const boardArray = [
	[0,0, 'spawn-point'], [1,0], [2,0, 'cracked'], [3,0], [4,0], [5,0],
	[0,1, 'portal'], [1,1, 'spike'], [2,1], [3,1], [4,1], [5,1],
	[0,2], [1,2], [2,2, 'reward-point'], [3,2], [4,2], [5,2],
	[0,3], [1,3], [2,3], [3,3], [4,3, 'spike'], [5,3, 'cracked'],
	[0,4, 'reward-point'], [1,4], [2,4, 'portal'], [3,4], [4,4], [5,4],
	[0,5], [1,5], [2,5], [3,5, 'cracked'], [4,5], [5,5, 'end-point'],
];


// Mutable

// player
let playerPosition = [];

// board
let endPoint = [];
let collectedPoints = 0;
let collectedPointsArray = [];

// obstacles

// spike
let isSpikeOn;

// portal
// x, y
let portalsArray = [];

// cracked
// x, y, used
let crackedArray = [];


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
		portal: `<img 
			style="margin-left: ${xPos}px; top: ${yPos}px"
			src="${imagePath}portal.png" 
			id="portal"
			>`,	
		cracked: `<img 
			style="margin-left: ${xPos}px; top: ${yPos}px"
			src="${imagePath}cracked-0.png" 
			id="cracked"
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
		case 'portal':
			container.innerHTML += elements.portal;
			break;
		case 'cracked':
			container.innerHTML += elements.cracked;
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
		// spike
		if (
			arr[2] == 'spike' // add move in future (what the hell is it)
			&& arr[0] == playerPosition[0]
			&& arr[1] == playerPosition[1]
			&& isSpikeOn == true
		) {
			collectedPoints--;
			setScore(collectedPoints);
		}
		
		// portal
		if (
			arr[2] == 'portal'
			// if player in portal
			&& arr[0] == playerPosition[0] 
			&& arr[1] == playerPosition[1]
			
			&& arr[0] == portalsArray[0][0]
			&& arr[1] == portalsArray[0][1]
		) {
			// function jusst because of the delay
			const move = (e) => {
				if (e && e.key == 'e') {
					const player = document.getElementById('player');
					const position = getPosition(portalsArray[1], blockWidth);
					
					player.style.marginLeft = `${position[0]}px`;
					player.style.marginTop = `${position[1]}px`;
					
					playerPosition[0] = portalsArray[1][0];
					playerPosition[1] = portalsArray[1][1];
				
					window.removeEventListener('keydown', move);
				} else {
					console.log('Press E');
					window.removeEventListener('keydown', move);
				}
			}
			window.addEventListener('keydown', move);
		}
		
		// cracked brick
		if (
			arr[2] == 'cracked'
			&& arr[0] == playerPosition[0] 
			&& arr[1] == playerPosition[1]
		) {
			const crackedElem = document.querySelectorAll('#cracked');
			
			crackedArray.forEach((value, index) => {
				// add crack
				if (arr[0] == value[0] && arr[1] == value[1] && value[2] != 4) {
					let crackedState;
					crackedState = parseInt(
						crackedElem[index].src.split('')[
							crackedElem[index].src.split('').length - 5
						]
					);
					
					value[2]++;
					crackedState++;
					
					if (crackedState == 4) {
						crackedElem[index].src = `${imagePath}cracked-4.png`;
						setScore('You lost', 1);
					} else {
						crackedElem[index].src = `${imagePath}cracked-${crackedState}.png`;
					}
				}
			})
		}
	});
}


//     OBSTACLES     //


const obstacles = () => {
	// elements of all obstacles
	const spikesArray = document.querySelectorAll('#spike');
	const portalArray = document.querySelectorAll('#portal');

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
			// works as game tick, it will maybe fuck up cracked floor detection
			await delay(1300);
		}
	}

	const portal = async () => {
		// Element
		portalArray[0].src = `${imagePath}portal-0.png`;
		portalArray[1].src = `${imagePath}portal-1.png`;
		
		// get portals x,y
		boardArray.forEach((arr) => {
			if (arr[2] == 'portal' && portalsArray.length < 2) {
				portalsArray.push([
					arr[0],
					arr[1]
				]);
			}
		})
	}

	const cracked =  () => {
		boardArray.forEach((arr) => {
			if (arr[2] == 'cracked') {
				crackedArray.push([
					arr[0],
					arr[1],
					0
				]);
			}
		})
	}

	// activate obstacles
	portal();
	spikes();
	cracked();
}


//     GAME MECHANIC	    //


// Generate board

const generateBoard = () => {
	boardArray.forEach((array) => {
		// get position and center 
		const xPosition = getPosition(array, blockWidth)[0];
		const yPosition = getPosition(array, blockWidth)[1] + blockWidth;
		
		// check block type
		// TODO instead undefined add 'block' to board
		const blockType = array[2] == 'spawn-point' ? 'spawn'
			: array[2] == 'end-point' ? 'end'
			: array[2] == 'reward-point' ? 'reward'
			
			// obstacles
			: array[2] == 'spike' ? 'spike'
			: array[2] == 'portal' ? 'portal'
			: array[2] == 'cracked' ? 'cracked'
			
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
}

// Get point

// arguments player element
const getPoint = (player) => {
	let timesLooped = -1;
	boardArray.forEach((arr) => {
		// get times looped
		arr[2] == 'reward-point' ? timesLooped++ : timesLooped = timesLooped
		
		// get current point
		if (
			arr[2] == 'reward-point'
			&& arr[0] == playerPosition[0] 
			&& arr[1] == playerPosition[1] 
			&& !collectedPointsArray.includes(arr) // if it's not collected
		) {
			const scoreElement = document.querySelectorAll('#reward');
			// get player state
			const playerState = parseInt(
				player.src.split('')[player.src.split('').length - 5]
			);
			
			// collect points and score
			collectedPoints++;
			collectedPointsArray.push(arr);
			setScore(collectedPoints);

			player.src = `${imagePath}player-v${playerState-1}.png`;
			scoreElement[timesLooped].src = `${imagePath}block.png`
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


//     TOGGLE GAME     //


// Start game

const startGame = () => {
	generateBoard();
	obstacles();
}

// Reset game

const resetGame = () => {
	// reset variables
	playerPosition = [];
	endPoint = [];
	collectedPoints = 0;
	collectedPointsArray = [];
	isSpikeOn = null;
	portalsArray = [];
	crackedArray = [];
	
	// reset elements
	container.innerHTML = '';
	score.innerText = 'Score: 0';
	
	//activate game
	startGame();
}


//     AUDIO     //


// Change volume

const audioVolume = (value) => {
	const audioElem = document.querySelector('audio');
	const range = value / 100;

	// allow looping and change volume
	// audioElem.loop = true
	audioElem.volume = range;
	audioElem.play();
}
