const canvas = document.querySelector('canvas');
const ctx = canvas?.getContext('2d');
const width = window.innerWidth * 0.85, height = window.innerHeight * 0.85;
const scoreElem = document.querySelector('#score');

canvas!.width = width;
canvas!.height= height;

type Pipe = {
	x: number,
	y: number,
	height: number
}


const gap = 200;
const numPipe = 3;

let topPipes: Pipe[] = [];
let bottomPipes: Pipe[] = [];
let bird = {
	x: 80,
	y: height / 2 - 50,
	velocity: 0
}

let score = 0;
let isLost = false;


window.addEventListener('keypress', (e: KeyboardEvent) => {
	if (e.keyCode == 32) {
		bird.velocity = 5;
	}
})

const randNum = (max:number) => Math.round( Math.random() * max );

const appendBird = (x:number,y:number) => {
	ctx!.fillStyle = 'yellow';
	ctx!.fillRect(x,y, 50,50);
}

const checkColision = () => {
	if (bird.y <= 0 || (bird.y+50) >= height) {
		isLost = true;
	} 
}

const newPipe = (num:number) => {
	for (let i=0; i < num; i++) {
		const heightRand = randNum(height*0.6); // 70% of max 
		
		topPipes.push({
			x: width-60 + i*360,
			y: 0,
			height: heightRand
		});
		bottomPipes.push({
			x: width-60 + i*360,
			y: heightRand + gap,
			height: 	height - (heightRand+gap)	
		});
	}
}

const generatePipe = () => {
	if (topPipes[0]) {
		topPipes.forEach((obj) => {
			if (obj.x <= 0) {
				topPipes.shift();
				bottomPipes.shift();
				newPipe(1);
			} else {
				obj.x -= 1.5;
			}
		});
		bottomPipes.forEach((obj) => {
			obj.x -= 1.5;
		});
	} else {
		newPipe(numPipe);
	}
} 

const checkPipeColision = () => {
	topPipes.forEach((pipe) => {
		if (
			((bird.x+50) >= pipe.x
			&& bird.x <= pipe.x)
			&& (
				bird.y <= pipe.height 
				|| bird.y+50 >= pipe.height+gap
			)
		) {
			isLost = true;
		}
	})
}

const appendPipes = () => {
	topPipes.forEach((obj) => {
		ctx!.fillStyle = 'green';
		ctx!.fillRect(obj.x,obj.y, 60,obj.height);
	});	
	
	bottomPipes.forEach((obj) => {
		ctx!.fillStyle = 'green';
		ctx!.fillRect(obj.x,obj.y, 60,obj.height);
	});
} 

const checkScore = () => {	
	topPipes.forEach((pipe) => {
		if (bird.x+50 >= pipe.x && bird.x <= pipe.x) {
			score += 1/32;
			scoreElem!.innerHTML = `Score: ${Math.floor(score)}`;
		}
	});
}

const loop = () => {
	ctx!.clearRect(0,0, width, height);
	
	appendBird(bird.x, bird.y);
	if (bird.velocity > 0) {
		bird.velocity -= 1
		bird.y -= height / 45;
	} else {
		bird.y += 1.7;
	} 
	checkColision();
	generatePipe();
	appendPipes();
	checkScore();
	checkPipeColision();
	
	if (!isLost) {
		window.requestAnimationFrame(loop);
		scoreElem!.innerHTML = `You lost (${score})`;
	}
}

window.requestAnimationFrame(loop);
