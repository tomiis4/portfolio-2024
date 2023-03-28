import './global.scss'

const scoreElem = document.querySelector('#score')

const canvas = document.querySelector('canvas');
const ctx = canvas!.getContext('2d');
const width = window.innerWidth * 0.85, height = window.innerHeight * 0.85;

const pipeImg = new Image;
const birdImg = new Image;
birdImg.src = 'https://media.discordapp.net/attachments/736674176265355264/1090314407994740847/PngItem_1842460.png?width=368&height=260';
pipeImg.src = 'https://demosc.chinaz.net/Files/DownLoad/webjs1/201402/jiaoben2063/src/wav/pipe1.png';

canvas!.width = width;
canvas!.height= height;

type BirdArg = {
	velocity: number,
	speed: number,
	position: number[],
	width: number
}

type Gap = {
	height: number,
	position_y: number
}

type PipeArg = {
	width: number,
	height: number,
	position: number[],
	gap: Gap
}

const randInt = (min: number, max: number) => {
	let num = () => Math.floor( Math.random() * max );
	let temp_num = 0;
	
	while (temp_num < min) {
		temp_num = num();
	}

	return temp_num;
}

class Bird {
	velocity;
	speed;
	position;
	width;

	constructor(e: BirdArg) {
		this.speed = e.speed;
		this.velocity = e.velocity;
		this.position = e.position;
		this.width = e.width;
	}


	append() {
		ctx!.drawImage(birdImg, this.position[0], this.position[1], this.width, this.width)

		this.border();
		this.move();
	}

	border() {
		const [_,y] = this.position;
		if (y <= 0 || y + this.width >= height) {
			isLost = true;
		} 
	}

	move() {
		if (this.velocity > 0) {
			this.velocity -= this.speed / 15;
			this.position[1] -= 9;
		} else {
			this.position[1] += 3;
		} 
	}

	jump() {
		this.velocity = this.speed;
	}

	getPosition() {
		return this.position;
	}
}

class Pipe {
	width;
	height;
	position;
	gap;

	constructor(e: PipeArg) {
		this.width = e.width;
		this.height = e.height;
		this.position = e.position;
		this.gap = e.gap;
	}

	append() {
		// append pipe
		ctx!.drawImage(pipeImg, this.position[0], this.position[1], this.width, this.height)

		// append gap
		ctx!.clearRect(this.position[0]-1, this.gap.position_y, this.width+2, this.gap.height);
	}

	move() {
		this.position[0] -= 7;
	}
}

class ManagePipes {
	pipes: Pipe[];
	max;

	constructor(max: number) {
		this.max = max
		this.pipes = [];
	}

	append() {
		this.fillArray();
		this.move();

		this.pipes.forEach(pipe => {
			pipe.append();
		});
	}

	fillArray() {
		const lastElemX = this.pipes.at(-1)?.position[0] ?? 0;
		const gapSize = width / this.max + 32.5
		// add gap (300px)
		if (width - lastElemX > gapSize && this.pipes.length < this.max) {
			this.pipes.push(new Pipe({
				width: 65,
				height: height,
				position: [width-65, 0],
				gap: {
					height: randInt(150, 300),
					position_y: randInt(20, height-300)
				}
			}));
		}
	}

	colision([Bx,By]: number[]) {
		this.pipes.forEach(pipe => {
			const [Px, _] = pipe.position;

			const gapHeight = pipe.gap.height
			const gapY = pipe.gap.position_y

			// if pipe reach end
			if (pipe.position[0] <= 0) {
				this.remove();
			}

			// if bird touch pipe
			if (
				(
					(Bx+50) >= Px
					&& Bx <= Px
				)
				&& 
				(
					By <= gapY
					|| By + 50 > gapY + gapHeight
				)
			) {
				isLost = true;
			}

			// check for score
			if (Bx+50 >= Px && Bx <= Px) {
				// this fix bug
				score += 1/7;
				scoreElem!.innerHTML = `${Math.round(score)}`;
			}
		});
	}

	remove() {
		this.pipes.shift();
	}

	move() {
		this.pipes.forEach(pipe => {
			pipe.move();
		})
	}
}


let isLost = false;
let score = 0;

const pipes = new ManagePipes(2);
const bird = new Bird({
	velocity: 0,
	speed: 5,
	position: [150, height/2 - 50/2],
	width: 50
})


window.addEventListener('keypress', (e: KeyboardEvent) => {
	if (e.keyCode == 32) {
		bird.jump();
	}
});

// main
const loop = () => {
	ctx!.clearRect(0,0, width, height);

	pipes.colision(bird.getPosition())

	pipes.append();
	bird.append();

	if (!isLost) {
		window.requestAnimationFrame(loop);
	} else {
		scoreElem!.innerHTML = `${Math.round(score)}`;
	}
}

window.requestAnimationFrame(loop);
