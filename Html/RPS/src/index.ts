const canvasElem: HTMLCanvasElement|null = document.querySelector('canvas');
const ctx = canvasElem?.getContext('2d');
const width = window.innerWidth * 0.85, height = window.innerHeight * 0.85;

canvasElem!.width = width;
canvasElem!.height= height;

let players = [
	{
		type: 'rock',
		position: [0,0],
		velocity: [0,0],
		speed: 3,
		
		width: 50,
		height: 50,
		
		child: [
			{
				position: [0,0],
				width: 25,
				height: 25
			}
		]
	},
	{
		type: 'paper',
		position: [200,200],
		velocity: [0,0],
		speed: 3,
		
		width: 50,
		height: 50,
	}
];

let player = {
	type: 'rock',
	position: [0,0],
	velocity: [0,0],
	speed: 3,
	
	width: 50,
	height: 50,		
	
	child: [
		{
			position: [-50,-50],
			width: 25,
			height: 25
		}
	]
}

const appendPlayer = (type: string, x:number,y:number, width:number, ctx:any) => {
	ctx.fillStyle = type == 'rock' ? 'red' :
		type == 'paper' ? 'green' :
		type == 'scissors' ? 'blue' :
		'white';
	ctx.fillRect(x,y, width,width);
}

document.addEventListener('keydown', (e: KeyboardEvent) => {
	switch (e.code) {
		case 'KeyW':
			player.velocity[1] = -player.speed;
			break;
		case 'KeyS':
			player.velocity[1] = player.speed;
			break;
		case 'KeyA':
			player.velocity[0] = -player.speed;
			break;
		case 'KeyD':
			player.velocity[0] = player.speed;
			break;
		default:
			return;
	}
})
document.addEventListener('keyup', (e: KeyboardEvent) => {
	if (e.code == 'KeyW' || e.code == 'KeyS') {
		player.velocity[1] = 0;
	} else if (e.code == 'KeyA' || e.code == 'KeyD') {
		player.velocity[0] = 0
	}
})

const updatePlayers = () => {
	// move main object (X)
	player.position[0] = player.position[0]+player.velocity[0] >= 0 && player.position[0]+player.velocity[0]+player.width <= width 
		? player.position[0]+player.velocity[0] 
		: player.position[0]
	// move main object (Y)
	player.position[1] = player.position[1]+player.velocity[1] >= 0 && player.position[1]+player.velocity[1]+player.width <= height
		? player.position[1]+player.velocity[1] 
		: player.position[1]
	
	// move childs
	player.child.forEach((child) => {
		child.position[0] += player.velocity[0];
		child.position[1] += player.velocity[1];
	})
	
	// append to all players
	players = [];
	players.push(player);
	
	// testing
	players.push({
		type: 'paper',
		position: [200,200],
		velocity: [0,0],
		speed: 3,
		
		width: 50,
		height: 50,		
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
	
	// check for colision 
	if (
		playerBox[0] < enemyBox[0] + width
		&& playerBox[0] + width > enemyBox[0]
		
		&& playerBox[1] < enemyBox[1] + height 
		&& height + playerBox[1] > enemyBox[1]
	) {
		console.log('Colision detected')
	}
}

const loop = (): void => {
	ctx?.clearRect(0,0, width, height);
	
	updatePlayers();
	checkColision();
	players.forEach((obj) => {
		if (obj.child) {
			obj.child.forEach((objCh) => {
				appendPlayer(obj.type, objCh.position[0], objCh.position[1], objCh.width, ctx);
			})
		}
		appendPlayer(obj.type, obj.position[0], obj.position[1], obj.width, ctx);
	});
	
	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
