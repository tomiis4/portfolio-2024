const canvasElem: HTMLCanvasElement|null = document.querySelector('canvas');
const ctx = canvasElem?.getContext('2d');
const width = window.innerWidth * 0.85, height = window.innerHeight * 0.85;

canvasElem!.width = width;
canvasElem!.height= height;


const appendPlayer = (type:'rock' | 'paper' | 'scissors', x:number,y:number, ctx:any) => {
	ctx.fillStyle = type == 'rock' ? 'red' :
		type == 'paper' ? 'green' :
		type == 'scissors' ? 'blue' :
		'white';
	ctx.fillRect(x,y, 50,50);
}

const loop = (): void => {
	ctx?.clearRect(0,0, width, height);
	
	appendPlayer('paper', 40.5,40.5, ctx);
	appendPlayer('rock', 10,10, ctx);
	appendPlayer('scissors', 190,20, ctx);
	
	window.requestAnimationFrame(loop);
}


window.requestAnimationFrame(loop);
