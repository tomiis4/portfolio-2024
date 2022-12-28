const canvasElem: HTMLCanvasElement|null = document.querySelector('canvas');
const ctx = canvasElem?.getContext('2d');
const width = window.innerWidth * 0.85, height = window.innerHeight * 0.85;

canvasElem!.width = width;
canvasElem!.height= height;

type PlayerType = 'rock' | 'paper' | 'scissors';

type Child = {
	type: PlayerType,
	
	position: number[],
	velocity: number[],
	
	width: number,
	height: number
}

type Player = {
	type: PlayerType,
	
	position: number[],
	velocity: number[],
	
	speed: number,
	isMoving: boolean,
	
	width: number,
	height: number,
	
	child: Child[]
}

let players: Player[] = [];
let player: Player = {
	type: 'scissors',
	position: [0,0],
	velocity: [0,0],
	
	speed: 3,
	isMoving: false,
	
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

// uilt
const isNegative = (n: number):boolean => {
	if (n.toString().indexOf('-') == -1) {
		return false;
	} else {
		return true;
	}
}

// append player on canvas
const appendPlayer = () => {
	players.forEach((obj) => {
		const color = obj.type == 'rock' ? 'red' :
			obj.type == 'paper' ? 'green' :
			obj.type == 'scissors' ? 'blue' :
			'white';
		
		// append parents
		ctx!.fillStyle = color;
		ctx!.fillRect(obj.position[0], obj.position[1], obj.width, obj.height);
		
		// append childs if any
		if (obj.child[0]) {
			obj.child.forEach((child) => {
				ctx!.fillStyle = color;
				ctx!.fillRect(child.position[0], child.position[1], child.width, child.height);
			});
		}
	});
}

const changeChild = (key: string, to:string | number, position: 0|1) => {
	player.child.forEach((obj) => {
		obj[key][position] = to;
	});
}

// Movment
document.addEventListener('keydown', (e: KeyboardEvent) => {
	let [vx, vy] = player.velocity;
	const speed = player.speed;
	
	switch (e.code) {
		case 'KeyW':
			player.isMoving = true;
			vy = -speed;
			changeChild('velocity', -speed, 1);
			break;
		case 'KeyS':
			player.isMoving = true;
			vy = speed;
			changeChild('velocity', speed, 1);
			break;
		case 'KeyA':
			player.isMoving = true;
			vx = -speed;
			changeChild('velocity', -speed, 0);
			break;
		case 'KeyD':
			player.isMoving = true;
			vx = speed;
			changeChild('velocity', speed, 0);
			break;
		default: return;
	}
	player.velocity = [vx,vy];
})
document.addEventListener('keyup', () => player.isMoving = false );

const resetVelocity = (velocity: number[], fadeOut: number): number[] => {
	const isMoving = player.isMoving;
	let [vx, vy] = velocity;
	
	// change
	if (isNegative(vy) && isMoving == false && vy != 0) {
		vy += fadeOut;
	} else if (isMoving == false && vy != 0) {
		vy -= fadeOut;
	}	
	if (isNegative(vx) && isMoving == false && vx != 0) {
		vx += fadeOut;
	} else if (isMoving == false && vx != 0) {
		vx -= fadeOut;
	}
	
	// floating math fix
	vy = vy<0.1&&vy>-0.1 ? 0 : vy;
	vx = vx<0.1&&vx>-0.1 ? 0 : vx;
	return [vx,vy];
}

const checkDistance = (parent:number[], child:number[]):boolean => {
	const maxDistance = 50;
	const [pX, pY] = parent;
	const [cX, cY] = child;
	
	if (Math.abs(pX-cX) <= maxDistance && Math.abs(pY-cY) <= maxDistance) {
		return false;
	} else {
		return true;
	}
}

// only current player
const parentChildColision = () => {
	if (!player.child[0]) return;
	player.child.forEach((child) => {
		const [x, y] = child.position;
		const [width, height] = [child.width, child.height];
		let [vx, vy] = child.velocity;

		const [Px, Py] = player.position;
		const [Pwidth, Pheight] = [player.width, player.height];
		
		// child 
		const isLeft = x < Px + Pwidth;
		const isRight = x + width > Px;
		const isTop = y < Py + Pheight;
		const isBottom = y + height > Py;
		
		// parent 
		const isLeftP = Px < x + width;
		const isRightP = Px + Pwidth > x;
		const isTopP = Py < y + height;
		const isBottomP = Py + Pheight > y;
		
		if (
			(isTop && isBottom && isLeft && isRight) 
			&& (isTopP && isBottomP && isLeftP && isRightP)
		) {
			vy = vy * (-1.2);
			vx = vx * (-1.2);
		} 
		
		child.velocity = [vx,vy];
	});
}

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
				
				// child 
				const isLeft = x < Cx + Cwidth;
				const isRight = x + width > Cx;
				const isTop = y < Cy + Cheight;
				const isBottom = y + height > Cy;
				
				// parent 
				const isLeftP = Cx < x + width;
				const isRightP = Cx + Cwidth > x;
				const isTopP = Cy < y + height;
				const isBottomP = Cy + Cheight > y;
				
				if (
					(isTop && isBottom && isLeft && isRight) 
					&& (isTopP && isBottomP && isLeftP && isRightP)
				) {
					vy = vy * (-1);
					vx = vx * (-1);
				} 
				
				child.velocity = [vx,vy];
			}
		});
	});
}

// global players
const getWin = (oponentType:PlayerType, playerType:PlayerType): string => {
	// oponent
	if (
	(oponentType=='rock' && playerType=='scissors')
	|| (oponentType=='paper' && playerType=='rock')
	|| (oponentType=='scissors' && playerType=='paper')
	) {
		console.log(`Enemy has won`);
		return 'enemy';
	}
	
	// player
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

const checkOponentParent = () => {
	// check coliding
	if (players.length == 1) return;
	players.forEach((obj) => {
		// oponent
		const [x,y] = obj.position;
		const [width, height] = [obj.width, obj.height];
		
		// player
		const [Px,Py] = player.position;
		const [Pwidth, Pheight] = [player.width, player.height];
		
		// oponent
		const isLeft = x < Px + Pwidth;
		const isRight = x + width > Px;
		const isTop = y < Py + Pheight;
		const isBottom = y + height > Py;
		
		if (isTop && isBottom && isLeft && isRight) {
			const oponentType = obj.type;
			const playerType = player.type;
			
			if (getWin(oponentType, playerType) == 'player') {
				obj.type = playerType;
			}
		} 
	});
}

const checkOponentChild = () => {
	// check coliding
	if (players.length == 1) return;
	players.forEach((obj) => {
		// oponent
		const [x,y] = obj.position;
		const [width, height] = [obj.width, obj.height];
		
		player.child.forEach((child) => {
			//	player
			const [Cx,Cy] = child.position;
			const [Cwidth, Cheight] = [child.width, child.height];
			
			// oponent
			const isLeft = x < Cx + Cwidth;
			const isRight = x + width > Cx;
			const isTop = y < Cy + Cheight;
			const isBottom = y + height > Cy;
			
			if (isTop && isBottom && isLeft && isRight) {
				const oponentType = obj.type;
				const childType = player.type;
				
				if (getWin(oponentType, childType) == 'player') {
					obj.type = childType;
				}
			} 
		});
	});
} 

const checkOponentChildChild = () => {
	// check coliding
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
				
				// oponent
				const isLeft = x < Cx + Cwidth;
				const isRight = x + width > Cx;
				const isTop = y < Cy + Cheight;
				const isBottom = y + height > Cy;
				
				if (isTop && isBottom && isLeft && isRight) {
					const oponentType = oponents.type;
					const childType = player.type;
					
					if (getWin(oponentType, childType) == 'player') {
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
	//		1. left border;  2. right border
	if ((x+vx <= 0) || (x+widthPlr+vx >= width)) {
		x = x+vx <= 0 ? 0 : width-widthPlr;
		vx = vx*((-1) * (Math.random()*1.2)+0.2);
	}
	x += vx;
	
	//		1. top border;  2. bottom border
	if ((y+vy <= 0) || (y+heightPlr+vx >= height)) {
		y = y+vy <= 0 ? 0 : height-heightPlr;
		vy = vy*((-1) * Math.random()-0.2);
	}
	y += vy;
	
	// update
	player.position = [x,y];
	player.velocity = [vx,vy];
}

const moveChild = () => {
	if (!player.child[0]) return;
	player.child.forEach((child) => {
		let [x,y] = child.position;
		let [vx,vy] = child.velocity;
		
		const rand = Math.floor(Math.random()*100) / 900; // smaller = less
		const fadeOut = 0.2;
		const parrentMiddle = [player.position[0]+player.width/2, player.position[1]+player.height/2];
		const childMiddle = [child.position[0]+child.width/2, child.position[1]+height/2];
		const heightChild = child.height, widthChild = child.width;
		
		// update player (how fast)
		// left, right
		if ((x+vx <= 0) || (x+widthChild+vx >= width)) {
			x = x+vx <= 0 ? 0 : width-widthChild;
			vx = vx*((-1) * Math.random());
		}
		x += vx==0 ? 0
			: checkDistance(parrentMiddle,childMiddle) ? vx
			: isNegative(vx) ? vx-fadeOut
			: vx+fadeOut;
		
		// top, bototm
		if ((y+vy <= 0) || (y+heightChild+vx >= height)) {
			y = y+vy <= 0 ? 0 : height-heightChild;
			vy = vy*((-1) * Math.random());
		}
		y += vy==0 ? 0 
			: checkDistance(parrentMiddle,childMiddle) ? vy
			: isNegative(vy) ? vy-fadeOut
			: vy+fadeOut;
		
		// update (how long)
		child.velocity = [vx,vy]
		child.position = [x,y];
		child.velocity = resetVelocity(child.velocity, rand);
	});
}

const updatePlayers = () => {
	parentChildColision();
	childChildColision();
	movePlayer();
	moveChild();
	
	// reset velocity to 0
	player.velocity = resetVelocity(player.velocity, 0.1);
	
	// append data to all players
	players = [];
	players.push(player);
	
	// testing oponent (REMOVE)
	players.push({
		type: 'paper',
		position: [200,200],
		velocity: [0,0],
		speed: 3,
		
		width: 50,
		height: 50,
		isMoving: false,
		
		child: [
			{
				type: 'paper',
				position: [-50,-50],
				velocity: [0,0],
				width: 25,
				height: 25
			},
			{
				type: 'paper',
				position: [75,75],
				velocity: [0,0],
				width: 25,
				height: 25
			}
		]	
	});
}

const checkGame = () => {
	checkOponentParent();
	checkOponentChild();
	checkOponentChildChild();
}

const loop = (): void => {
	ctx!.clearRect(0,0, width, height);
	
	updatePlayers();
	appendPlayer();
	checkGame();
	
	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
