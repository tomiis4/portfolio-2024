const canvasElem: HTMLCanvasElement|null = document.querySelector('canvas');
const ctx = canvasElem?.getContext('2d');
const width = window.innerWidth * 0.85, height = window.innerHeight * 0.85;

canvasElem!.width = width;
canvasElem!.height= height;

type Child = {
	position: number[],
	velocity: number[],
	width: number,
	height: number
}

type Player = {
	type: 'rock' | 'paper' | 'scissors',
	
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
	type: 'rock',
	position: [0,0],
	velocity: [0,0],
	speed: 3,
	width: 50,
	height: 50,	
	isMoving: false,
	child: [
		{
			position: [0,75],
			velocity: [0,0],
			width: 25,
			height: 25
		},
		{
			position: [0,-75],
			velocity: [0,0],
			width: 25,
			height: 25
		}
	]
}

// uilt
// const isNegative = (n: number):boolean => n.toString().indexOf();
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

const changeChild = (key: string, position: 0|1, to:string | number) => {
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
			changeChild('velocity', 1, -speed);
			break;
		case 'KeyS':
			player.isMoving = true;
			vy = speed;
			changeChild('velocity', 1, speed);
			break;
		case 'KeyA':
			player.isMoving = true;
			vx = -speed;
			changeChild('velocity', 0, -speed);
			break;
		case 'KeyD':
			player.isMoving = true;
			vx = speed;
			changeChild('velocity', 0, speed);
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
	const maxDistance = 80;
	const [pX, pY] = parent;
	const [cX, cY] = child;
	
	if (Math.abs(pX-cX) <= maxDistance && Math.abs(pY-cY) <= maxDistance) {
		return false;
	} else {
		return true;
	}
}

const movePlayer = () => { 
	
	let [x,y] = player.position;
	let [vx,vy] = player.velocity;
	
	// update player
	x += vx;
	y += vy;
	
	// update
	player.position = [x,y];
}

const moveChild = () => {
	if (player.child[0]) {
		player.child.forEach((child) => {
			let [x,y] = child.position;
			let [vx,vy] = child.velocity;
			
			const rand = Math.floor(Math.random()*100) / 900; // smaller = less
			const fadeOut = 0.2;
			const parrentMiddle = [player.position[0]+player.width/2, player.position[1]+player.height/2];
			const childMiddle = [child.position[0]+child.width/2, child.position[1]+height/2];
			
			// update player (how fast)
			x += vx==0 ? 0
				: checkDistance(parrentMiddle,childMiddle) ? vx
				: isNegative(vx) ? vx-fadeOut
				: vx+fadeOut;
			y += vy==0 ? 0 
				: checkDistance(parrentMiddle,childMiddle) ? vy
				: isNegative(vy) ? vy-fadeOut
				: vy+fadeOut;
			
			// update (how long)
			child.position = [x,y];
			child.velocity = resetVelocity(child.velocity, rand);
		});
	}
}

const updatePlayers = () => {
	movePlayer();
	moveChild();
	
	// reset velocity to 0
	player.velocity = resetVelocity(player.velocity, 0.1);
	
	// append data to all players
	players = [];
	players.push(player);
	
	// testing opeonent (REMOVE)
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
			position: [-50,-50],
			velocity: [0,0],
			width: 25,
			height: 25
		},
		{
			position: [75,75],
			velocity: [0,0],
			width: 25,
			height: 25
		}
	]	
	});
}

const checkColision = () => {
	const width = 50;
	const height = 50;
	
	const playerBox = [
		players[0].position[0] - width/2,
		players[0].position[1] - height/2
	];
	
	const enemyBox = [
		players[1].position[0] - width/2,
		players[1].position[1] - height/2
	];
	
	// check for main box colision
	if (
		playerBox[0] < enemyBox[0] + width
		&& playerBox[0] + width > enemyBox[0]
		
		&& playerBox[1] < enemyBox[1] + height 
		&& height + playerBox[1] > enemyBox[1]
	) {
		console.log('Colision detected')
	}
	
	
	const childWidth = 25;
	const childHeight = 25;
	
	// child & child detection
	players[0].child?.forEach((child) => {
		const childBox = [
			child.position[0] - width/2,
			child.position[1] - height/2
		];
		
		// check for child colision
		if (
			childBox[0] < enemyBox[0] + width 
			&& childBox[0] + childWidth > enemyBox[0]
			
			&& childBox[1] < enemyBox[1] + height
			&& childHeight + childBox[1] > enemyBox[1]
		) {
			console.log('child-parent colision detected')
		}
		
		// child & child
		players[1].child?.forEach((oponentChild) => {
			const oponentChBox = [
				oponentChild.position[0] - childWidth/2,
				oponentChild.position[1] - childHeight/2
			]
			
			if (
				childBox[0] < oponentChBox[0] + childWidth 
				&& childBox[0] + childWidth > oponentChBox[0]
				
				&& childBox[1] < oponentChBox[1] + childHeight
				&& childHeight + childBox[1] > oponentChBox[1]
			) {
				console.log('Child-Child colision detected')
			}
		})
	});
}

const loop = (): void => {
	ctx!.clearRect(0,0, width, height);
	
	updatePlayers();
	checkColision();
	appendPlayer();
	
	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
