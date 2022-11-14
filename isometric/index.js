//-----UI-----//



// VARIABLES: DOM, Objects //


// Image
const imagePath = './images/';

// DOM
const audioDOM = document.querySelector('audio');
const audioSourceDOM = '<audio src="./music/theme-music-long.mp3" loop></audio>';
const imageDOM = `<img src="${imagePath}coin.png" class="background-image">`;
const coinDOM = `
	<div class="coin-container">
		<img src="${imagePath}coin.png" alt="coin">
		<p id="coins-text"> 529 </p>
	</div>`;
const exitDOM = `
	<div class="exit-button" onClick="getHome()">
		<div id="x"></div>
		<div id="y"></div>
	</div>`;

// Objects
const shopItems = {
	// player
	player: [
		{
			img: `${imagePath}player-v1.png`,
			name: "Player1",
			price: 50,
		},
		{
			img: `${imagePath}player-v2.png`,
			name: "Player2",
			price: 1,
		},
		{
			img: `${imagePath}player-v3.png`,
			name: "Player3",
			price: 420,
		}
	],
	
	// block
	block: [
		{
			img: `${imagePath}cracked-0.png`,
			name: "Block1",
			price: 45,
		},
		{
			img: `${imagePath}portal-0.png`,
			name: "Block2",
			price: 6,
		},
		{
			img: `${imagePath}special-block.png`,
			name: "Block2",
			price: 606,
		},
	],
	
	// music
	music: [
		{
			img: `${imagePath}spike-0.png`,
			name: "Music1",
			price: 50,
		},
		{
			img: `${imagePath}spike-1.png`,
			name: "Music2",
			price: 66,
		},
	]
};


// FUNCTIONS: getHome, getShop, getSettings //


// Home
const getHome = () => {
	document.body.innerHTML = `
		${coinDOM}
		${imageDOM}
		${audioSourceDOM}
		
		<div class="menu-container">
			<h1 class="title"> Toxic <br> Collector </h1>
			<div class="button-container">
				<input type="button" value="Play" onClick="getGame()">
				<input type="button" value="Shop" onClick="getShop()">
				<input type="button" value="Settings" onClick="getSettings()">
			</div>
		</div>
	`;
}

// Shop
const getShop = () => {
	document.body.innerHTML = `
		${coinDOM}
		${imageDOM}
		${audioSourceDOM}
		
		<div class="shop-container">
			<h1 class="title"> Shop </h1>
			<div class="shop-wrapper">
				<div class="item-select">
					<div id="player" onClick="changeCards('player')"> Player </div>
					<div id="block" onClick="changeCards('block')"> Block </div>
					<div id="music" onClick="changeCards('music')"> Music </div>
				</div>
				<div class="card-container">
				</div>
				${exitDOM}
			</div>
		</div>
	`;
	
	changeCards('player');
}

// Settings
const getSettings = () => {
	document.body.innerHTML = `
		${coinDOM}
		${imageDOM}
		${audioSourceDOM}
		
		<div class="settings-container" onLoad="">
			<h1 class="title"> Settings </h1>
			<div class="settings-wrapper">
				<div class="music">
					<h3> Music </h3>
					<div class="music-input">
						<input type="range" value="50" onInput='changeVolume(this.value, "music")'>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
						<div class="show-range-m"></div>
					</div>
				</div>
				<hr>
				<div class="sound">
					<h3> Sound </h3>
					<div class="sound-input">
						<input type="range" value="50" onInput='changeVolume(this.value, "sound")'>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
						<div class="show-range-s"></div>
					</div>
				</div>
				<hr>
				${exitDOM}
			</div>
		</div>
	`;
	
	changeVolume(10, 'm');
	audioDOM.play();
}

const getGame = async () => {
	document.body.innerHTML = `
		${coinDOM}
		${imageDOM}
		${audioSourceDOM}

		<div class="game-container">
			<h1 id="score" class="title"> Score: 0 </h1>
			<div class="game-wrapper"></div>
		</div
	`;

	await startGame();
}


// UILTS: changeStyle, changeVolume, changeShop //


// Change style 
const changeStyle = ({element, backgroundColor, textColor}) => {
	element.style.background = backgroundColor;
	element.style.color = textColor;
}

// Change volume
const changeVolume = (volumeRange, type) => {
	const typeSplit = type.split('')[0];
	const rangeElem = document.querySelectorAll(`.show-range-${typeSplit}`);
	const volume = Math.round(volumeRange / 10)+1;
	
	audioDOM.volume = (volume /10) * 0.9;
	
	// toggle on first half
	for (let i=0; i<volume; i++) {
		rangeElem[i].style.background = 'var(--green)';
	}

	// toggle off last half
	for (let j=volume; j<rangeElem.length; j++) {
		rangeElem[j].style.background = 'var(--medium-green)';
	}
}

// Change shop cards
const changeCards = (type) => {
	const cardContainer = document.querySelector('.card-container');
	const selectCard = document.querySelector(`#${type}`);
	const othersCard = document.querySelectorAll('.item-select div');
	let elements = '';

	shopItems[type].map((data) => (
		elements += `<div class="card">
			<img class="card-icon" src="${data.img}">
			<div class="card-info">
				<h2 class="card-title"> ${data.name} </h2>
				<div class="buy-card" onClick="buyCard(this.id)" id="${data.name}">
					<p> ${data.price} </p>
					<img src="${imagePath}coin.png">
				</div>
			</div>
		</div>`
	));
	
	othersCard.forEach((elem) => {
		changeStyle({
			element: elem,
			backgroundColor: 'var(--dark-green)',
			textColor: 'var(--grey)'
		});
	})
	
	changeStyle({
		element: selectCard,
		backgroundColor: 'var(--black-green)',
		textColor: 'var(--green)'
	});
	cardContainer.innerHTML = elements;
}



//-----GAME-----//



// VARIABLES: DOM, playerInfo, board, levels //


// Constants

// DOM
// const container = document.querySelector('.game-wrapper');
const score = document.getElementById('score');

// Player
const blockWidth = 130; // -20 px of the 150
const playerWidth = blockWidth / 2;
const scale = 100;

// Board
const boardArray = [
	[0,0, 'spawn-point'], [1,0, 'block'], [2,0, 'cracked'],
	[0,1, 'portal'], [1,1, 'spike'], [2,1,'block'], [3,1,'block'], [4,1,'block'], [5,1,'block'],
	[2,2, 'reward-point'], [3,2,'block'], [4,2,'block'], [5,2,'block'],
	[0,3,'block'], [1,3,'block'], [2,3,'block'], [3,3,'block'], [4,3, 'spike'], [5,3, 'cracked'],
	[0,4, 'reward-point'], [1,4,'block'], [2,4, 'portal'],
	[0,5,'block'], [1,5,'block'], [2,5,'cracked'], [3,5, 'cracked'], [4,5,'block'], [5,5, 'end-point']
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
// [x, y]
let portalsArray = [];

// cracked
// [x, y, used]
let crackedArray = [];


// UILTS: delay, getPosition, setScore, insertElement, check win,lose, obstacles //


// Delay
const delay = (ms) => {
	return new Promise(res => setTimeout(res, ms));
}

// Get position
//		arguments 2d array and block width px
//		return x,y in pixels
const getPosition = (array, width) => {
	// calculate position and scale it to the block size
	const getX = (array[0] * 1 + array[1] * -1) * (width / 2);
	const getY = (array[0] * 0.5 + array[1] * 0.5) * (width / 2) + scale;
	
	return [getX, getY];
}

// Set score
//		arguments score, isCustom
const setScore = (scoreVal, isCustom) => {
	const score = document.getElementById('score');

	if (isCustom) {
		score.innerText = scoreVal;
	} else {
		score.innerText = `Score: ${scoreVal}`;
	}
}

// Insert element
//		arguments type of element, x,y position in px, 2d array
const insertElement = ({type, xPos, yPos, array}) => {
	const container = document.querySelector('.game-wrapper');
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
			id="player-game"
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


// OBSTACLES //


// Check obstacles
const checkObstacle = () => {
	const previousPoints = [collectedPoints];
	const player = document.getElementById('player-game');
	
	boardArray.forEach((arr) => {
		// spike
		if (
			arr[2] == 'spike' // add move in future (what the hell is previous comment)
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
					const position = getPosition(portalsArray[1], blockWidth);
					
					player.style.marginLeft = `${position[0]}px`;
					player.style.marginTop = `${position[1] - scale}px`;
					
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
	if (previousPoints[0] > collectedPoints) {
		const playerState = parseInt(
			player.src.split('')[player.src.split('').length - 5]
		);
		
		player.src = `${imagePath}player-v${playerState == 3 ? 3 : playerState+1}.png`;
	}
}

// Obstacles
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


// GAME MECHANIC: board, getpoint, move //


// Generate board
const generateBoard = () => {
	boardArray.forEach((array) => {
		// get position and center 
		const xPosition = getPosition(array, blockWidth)[0];
		const yPosition = getPosition(array, blockWidth)[1] + blockWidth;
		
		// check block type
		const blockType = array[2] == 'spawn-point' ? 'spawn'
			: array[2] == 'end-point' ? 'end'
			: array[2] == 'reward-point' ? 'reward'
			
			// obstacles
			: array[2] == 'spike' ? 'spike'
			: array[2] == 'portal' ? 'portal'
			: array[2] == 'cracked' ? 'cracked'
			
			// brick
			: array[2] == 'block' ? 'brick'
			
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
//		argument: player dom
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
	const player = document.getElementById('player-game');
	const getPlayerPosition = getPosition(playerPosition, blockWidth);
	const xPos = getPlayerPosition[0];
	const yPos = getPlayerPosition[1];

	player.style.marginLeft = `${xPos}px`;
	player.style.marginTop = `${yPos - scale}px`;

	getPoint(player);
}


// CONTROLS: keypress //


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


// TOGGLE GAME: Start, reset game //


// Start game
const startGame = () => {
	generateBoard();
	obstacles();

	document.body.addEventListener("keypress", keyPress);
}

// Reset game
const resetGame = () => {
	const container = document.querySelector('.game-wrapper');
	const score = document.querySlector('#score');
	
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

