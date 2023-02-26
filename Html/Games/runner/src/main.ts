import './style.scss'

const scoreElem = document.querySelector('#score')

const canvas = document.querySelector('canvas');
const ctx = canvas!.getContext('2d');
const width = window.innerWidth * 0.85, height = window.innerHeight * 0.85;

canvas!.width = width;
canvas!.height= height;

type Tree = {
	position: number[],
	size: number[]
}

const speed = 5;
const maxTree = 5;
const treeGap = width / maxTree;

let score = 0;

let isEnd = false;
let trees: Tree[] = [];
let runner = {
	position: [100, height-50],
	velocity: 0,
	size: [50,50]
};


// jumping
window.addEventListener('keypress', (e: KeyboardEvent) => {
	if (e.keyCode == 32 && runner.velocity == 0) {
		runner.velocity = 5;
	}
});

// functions
const appendRunner = () => {
	const [x,y] = runner.position;
	const [w,h] = runner.size;

	ctx!.fillStyle = 'green';
	ctx!.fillRect(x,y, w, h);
}

const moveRunner = () => {
	if (runner.velocity > 0) {
		runner.velocity -= 0.25;
		runner.position[1] -= 15;
	}
	if (runner.velocity < 0) {
		runner.velocity += 0.25;
		runner.position[1] += 15;
	}

	if (runner.velocity == 0 && runner.position[1] != height-50) {
		runner.velocity = -5
	}
}

const createTrees = () => {
	const isNotMax = trees.length < maxTree;

	const lastTree = trees[trees.length-1] ?? {position:[width,height], size:[width,height]};
	const isGap = lastTree.position[0] + lastTree.size[0]+treeGap < width;

	if ( trees.length ==0 ||(isNotMax && (lastTree==undefined || isGap)) ) {
		const widthTree = 75;
		const heightTree = 30;

		trees.push({
			position: [width, height-heightTree],
			size: [widthTree, heightTree]
		})
	}
}

const appendTrees = () => {
	if (trees.length == 0) { return }

	trees.forEach((elem) => {
		const [x,y] = elem.position	
		const [w,h] = elem.size

		ctx!.fillStyle = 'black';
		ctx!.fillRect(x,y, w, h);
	});
}

const moveTrees = () => {
	if (trees.length == 0) { return }

	let remove = false

	trees.forEach((elem, index:number) => {
		let x = elem.position[0]	
		const width = elem.size[0];

		x -= speed;
		trees[index].position[0] = x

		if (x+width <= 0) { remove=true }
	});

	if (remove) {
		trees.shift();
	}
}

const checkCollision = () => {
	if (trees.length == 0) return

	trees.forEach(elem => {
		const [x,y] = runner.position
		const [w,h] = runner.size;

		const [x1,y1] = elem.position;
		const [w1,h1] = elem.size;

		const checkLeft = x < x1 + w1 && x + w > x1 && y < y1 + h1 && y + h > y1

		if (checkLeft) {
			isEnd = true;
		}
	});
}

const scoreInterval = setInterval(() => {
	score += 1
	scoreElem!.innerHTML = `Score: ${score}`
}, 1000);

// main
const loop = () => {
	ctx!.clearRect(0,0, width, height);

	checkCollision();

	createTrees();

	appendRunner();
	appendTrees();

	moveRunner();
	moveTrees();

	// check if is end
	if (!isEnd) {
		window.requestAnimationFrame(loop);
	} else {
		clearInterval(scoreInterval)
	}
}

window.requestAnimationFrame(loop);
