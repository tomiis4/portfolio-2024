// @ts-ignore
import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
// @ts-ignore
const socket = io('http://localhost:8080');

import {PlayerType, Child, Player, GameResult} from './uilts/types';
import {isNegative} from './uilts/check';
import './style/style.css';

const canvasElem: HTMLCanvasElement|null = document.querySelector('canvas');
const ctx = canvasElem?.getContext('2d');
const width = window.innerWidth * 0.85, height = window.innerHeight * 0.85;

canvasElem!.width = width;
canvasElem!.height= height;


let players: Player[] = [];
let player: Player = {
	type: 'scissors',
	position: [0,0],
	velocity: [0,0],
	
	speed: 3,
	isMoving: [false, false],
	
	width: 50,
	height: 50,	
	
	child: [
		{
			type: 'scissors',
			position: [0,75],
			velocity: [0,0],
			width: 25,
			height: 25
		},		{
			type: 'scissors',
			position: [0,150],
			velocity: [0,0],
			width: 25,
			height: 25
		}
	]
}


// append player on canvas
const appendPlayer = () => {
	players.forEach((obj) => {
		const [x,y] = obj.position
		const color = obj.type == 'rock' ? 'red' :
			obj.type == 'paper' ? 'green' :
			obj.type == 'scissors' ? 'blue' :
			'white';
		
		// append parents
		ctx!.fillStyle = color;
		ctx!.fillRect(x, y, obj.width, obj.height);
		
		// append childs if any
		if (obj.child[0]) {
			obj.child.forEach((child) => {
				const [xChild,yChild] = child.position;
				
				ctx!.fillStyle = color;
				ctx!.fillRect(xChild,yChild, child.width, child.height);
			});
		}
	});
}

// change every child from key in PLAYER
const changeChild = (key: 'velocity'|'position', to:number, position: 0|1) => {
	player.child.forEach((obj: Child) => {
		obj[key][position] = to;
	});
}

// Movment
document.addEventListener('keydown', (e: KeyboardEvent) => {
	let [vx, vy] = player.velocity;
	let [isMovingX, isMovingY] = player.isMoving;
	const speed = player.speed;
	
	// get keyCode and change velocity to speed
	switch (e.code) {
		case 'KeyW':
			isMovingY = true;
			vy = -speed;
			changeChild('velocity', -speed, 1);
			break;
		case 'KeyS':
			isMovingY = true;
			vy = speed;
			changeChild('velocity', speed, 1);
			break;
		case 'KeyA':
			isMovingX = true;
			vx = -speed;
			changeChild('velocity', -speed, 0);
			break;
		case 'KeyD':
			isMovingX = true;
			vx = speed;
			changeChild('velocity', speed, 0);
			break;
		default: return;
	}
	
	// update
	player.isMoving = [isMovingX, isMovingY];
	player.velocity = [vx,vy];
});

// when you stop moving
document.addEventListener('keyup', (e: KeyboardEvent) => {
	let [isMovingX, isMovingY] = player.isMoving;
	
	switch (e.code) {
		case 'KeyW':
			isMovingY = false;
			break;
		case 'KeyS':
			isMovingY = false;
			break;
		case 'KeyA':
			isMovingX = false;
			break;
		case 'KeyD':
			isMovingX = false;
			break;
		default: return;
	}
	
	// update
	player.isMoving = [isMovingX, isMovingY];
});

// slowly set velocity to 0
const resetVelocity = (velocity: number[], fadeOut: number): number[] => {
	const [isMovingX, isMovingY] = player.isMoving;
	let [vx, vy] = velocity;
	
	// change velocity depending on direction (top/bottom)
	if (isNegative(vy) && !isMovingY && vy != 0) {
		vy += fadeOut;
	} else if (!isMovingY && vy != 0) {
		vy -= fadeOut;
	}	
	
	// change velocity depending on direction (left/right)
	if (isNegative(vx) && !isMovingX && vx != 0) {
		vx += fadeOut;
	} else if (!isMovingX && vx != 0) {
		vx -= fadeOut;
	}
	
	// floating math fix
	vy = vy<0.1&&vy>-0.1 ? 0 : vy;
	vx = vx<0.1&&vx>-0.1 ? 0 : vx;
	
	return [vx,vy];
}

// only check for local player
const parentChildColision = () => {
	if (!player.child[0]) return;
	player.child.forEach((child) => {
		// child
		const [x, y] = child.position;
		const [width, height] = [child.width, child.height];
		let [vx, vy] = child.velocity;
		
		// play main box
		const [Px, Py] = player.position;
		const [Pwidth, Pheight] = [player.width, player.height];
		
		// check clision 
		const isLeft = x <= Px + Pwidth;
		const isRight = x + width >= Px;
		const isTop = y <= Py + Pheight;
		const isBottom = y + height >= Py;
		
		if (isTop && isBottom && isLeft && isRight) {
			// reverse velocity
			vy = vy * (-1.2);
			vx = vx * (-1.2);
		} 
		
		// update
		child.velocity = [vx,vy];
	});
}

// only check for local player
const childChildColision = () => {
	if (!player.child[0] || player.child.length == 1) return;
	player.child.forEach((child, index) => {
		const [x, y] = child.position;
		const [width, height] = [child.width, child.height];
		let [vx, vy] = child.velocity;
		
		player.child.forEach((childS, sIndex) => {
			if (index != sIndex) {
				const [Cx, Cy] = childS.position;
				const [Cwidth, Cheight] = [childS.width, childS.height];
				
				// check clision 
				const isLeft = x <= Cx + Cwidth,
					isRight = x + width >= Cx,
					isTop = y <= Cy + Cheight,
					isBottom = y + height >= Cy;
				
				if (isTop && isBottom && isLeft && isRight) {
					const checkX = (x+vx) * (-1);
					const checkY = (y+vy) * (-1);
					
					const isLeftCheck = checkX <= Cx + Cwidth,
						isTopCheck = checkY <= Cy + Cheight
					
					vy = isLeftCheck ? vy*(-1) : vy; 
					vx = isTopCheck ? vx*(-1) : vx;
				} 
				
				child.velocity = [vx,vy];
			}
		});
	});
}

// global players
const getWin = (oponentType:PlayerType, playerType:PlayerType): GameResult => {
	// oponent win
	if (
	(oponentType=='rock' && playerType=='scissors')
	|| (oponentType=='paper' && playerType=='rock')
	|| (oponentType=='scissors' && playerType=='paper')
	) {
		console.log(`Enemy has won`);
		return 'enemy';
	}
	
	// player win
	if (
		(oponentType=='rock' && playerType=='paper')
		|| (oponentType=='paper' && playerType=='scissors')
		|| (oponentType=='scissors' && playerType=='rock')
	) {
		console.log('Player has won (you!)');
		return 'player';
	}
	
	// draw
	return 'draw';
}

// check if coliding 2 objects
const checkOponentParent = () => {
	if (players.length == 1) return;
	
	players.forEach((obj) => {
		// oponent
		const [x,y] = obj.position;
		const [width, height] = [obj.width, obj.height];
		
		// player
		const [Px,Py] = player.position;
		const [Pwidth, Pheight] = [player.width, player.height];
		
		// check for status
		const isLeft = x <= Px + Pwidth;
		const isRight = x + width >= Px;
		const isTop = y <= Py + Pheight;
		const isBottom = y + height >= Py;
		
		if (isTop && isBottom && isLeft && isRight) {
			const oponentType = obj.type;
			const playerType = player.type;
			
			if (getWin(oponentType, playerType) == 'player') {
				// change type
				obj.type = playerType;
			}
		} 
	});
}

// check if coliding 2 objects
const checkOponentChild = () => {
	if (players.length == 1) return;
	
	players.forEach((obj) => {
		// oponent
		const [x,y] = obj.position;
		const [width, height] = [obj.width, obj.height];
		
		player.child.forEach((child) => {
			//	player
			const [Cx,Cy] = child.position;
			const [Cwidth, Cheight] = [child.width, child.height];
			
			// check for status
			const isLeft = x <= Cx + Cwidth;
			const isRight = x + width >= Cx;
			const isTop = y <= Cy + Cheight;
			const isBottom = y + height >= Cy;
			
			if (isTop && isBottom && isLeft && isRight) {
				const oponentType = obj.type;
				const childType = player.type;
				
				if (getWin(oponentType, childType) == 'player') {
					// change type
					obj.type = childType;
				}
			} 
		});
	});
} 

// check if coliding 2 objects
const checkOponentChildChild = () => {
	if (players.length == 1 || !player.child[0]) return;
	
	players.forEach((oponents) => {
		oponents.child.forEach((obj) => {
			// oponent
			const [x,y] = obj.position;
			const [width, height] = [obj.width, obj.height];
			
			player.child.forEach((child) => {
				//	player
				const [Cx,Cy] = child.position;
				const [Cwidth, Cheight] = [child.width, child.height];
				
				// check for status
				const isLeft = x <= Cx + Cwidth;
				const isRight = x + width >= Cx;
				const isTop = y <= Cy + Cheight;
				const isBottom = y + height >= Cy;
				
				if (isTop && isBottom && isLeft && isRight) {
					const oponentType = oponents.type;
					const childType = player.type;
					
					if (getWin(oponentType, childType) == 'player') {
						// change type
						obj.type = childType;
					}
				} 
			});
		});
	});
}

const movePlayer = () => { 
	let [x,y] = player.position;
	let [vx,vy] = player.velocity;
	const heightPlr = player.height, widthPlr = player.width;
	
	// update player && check for border colision
	if ((x+vx <= 0) || (x+widthPlr+vx >= width)) {
		// change position if coliding
		x = x+vx <= 0 ? 0 : width-widthPlr;
		//  reverse velocity 
		vx = vx*((-1) * (Math.random()*1.2)+0.2);
	}
	x += vx;
	
	//		1. top border;  2. bottom border
	if ((y+vy <= 0) || (y+heightPlr+vx >= height)) {
		// change position if coliding
		y = y+vy <= 0 ? 0 : height-heightPlr;
		//  reverse velocity 
		vy = vy*((-1) * (Math.random()*1.2)+0.2);
	}
	y += vy;
	
	// update
	player.position = [x,y];
	player.velocity = [vx,vy];
}

const moveChild = () => {
	if (!player.child[0]) return;
	
	player.child.forEach((child) => {
		// child
		let [x,y] = child.position;
		let [vx,vy] = child.velocity;
		const widthC = child.width, 
			heightC = child.height;
		
		// time 
		const fadeTimeRand = Math.floor(Math.random() * 100)/850;  //3.5
		const fadeOut = 0.2;
		
		// check for coliding border (left, right)
		if ((x+vx <= 0) || (x+widthC+vx >= width)) {
			// check which border was colided
			x = x+vx <= 0 ? 1 : (width-widthC)-1;
			// reverse velocity
			vx = vx*((-1) * Math.random());
		}
		x += vx==0 ? 0
			: isNegative(vx) ? vx-fadeOut 
			: vx+fadeOut;
		
		// check for coliding border (left, right)
		if ((y+vy <= 0) || (y+heightC+vy >= height)) {
			// check which border was colided
			y = y+vy <= 0 ? 1 : (height-heightC)-1;
			// reverse velocity
			vy = vy*((-1) * Math.random());
		}
		y += vy==0 ? 0 
			: isNegative(vy) ? vy-fadeOut
			: vy+fadeOut;
		
		// update velocity and then slowly decrease it
		child.velocity = [vx,vy]
		child.position = [x,y];
		child.velocity = resetVelocity(child.velocity, fadeTimeRand);
	});
}

// update everything about players
const updatePlayers = () => {
	// colision
	parentChildColision();
	childChildColision();
	
	// move
	movePlayer();
	moveChild();
	
	// reset velocity to 0
	player.velocity = resetVelocity(player.velocity, 0.1);
	
	// append data to all players
	players = [];
	players.push(player);
	
	
	// testing oponent (REMOVE)
	// players.push({
	// 	type: 'paper',
	// 	position: [200,200],
	// 	velocity: [0,0],
	// 	speed: 3,
		
	// 	width: 50,
	// 	height: 50,
	// 	isMoving: [false, false],
		
	// 	child: [
	// 		{
	// 			type: 'paper',
	// 			position: [-50,-50],
	// 			velocity: [0,0],
	// 			width: 25,
	// 			height: 25
	// 		},
	// 		{
	// 			type: 'paper',
	// 			position: [75,75],
	// 			velocity: [0,0],
	// 			width: 25,
	// 			height: 25
	// 		}
	// 	]	
	// });
}

const checkGame = () => {
	checkOponentParent();
	checkOponentChild();
	checkOponentChildChild();
}

const loop = (): void => {
	ctx!.clearRect(0,0, width, height);
	
	updatePlayers(); // update position players
	appendPlayer(); // append players
	checkGame(); // check if someone win
	
	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
