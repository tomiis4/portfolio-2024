const container = document.getElementById('container');
const board = [
	[0, 0, 'point'], [1, 0], [2, 0],
	[2, 1],
	[2, 2],
	[2, 3], [3, 3],
	[3, 4], [4, 4, 'point'],

	[0,0, 'player']
];
const height = 100;


const getPosition = (arr) => {
	const calcX = (arr[0] * 1 + arr[1] * -1) * (height / 2);
	const calcY = (arr[0] * 0.5 + arr[1] * 0.5) * (height / 2);

	return [calcX, calcY]
}


for (let i=0; i<board.length; i++) {
	const x = getPosition(board[i])[0] + height * 2;
	const y = getPosition(board[i])[1] + height;

	const type = board[i][2] == 'point'? 'border' 
		: board[i][2] == 'player' ? 'player'
		: 'grass';

	const elementBlock = `<div style="top: ${y}px; left: ${x}px" id="${type}"></div>`;
	
	const elementPlayer = `<div style="top: ${y - 75/2}px; left: ${x + ((100 - 75) / 2)}px" id="${type}"></div>`;


	if (type == 'player') {
		container.innerHTML += elementPlayer;
	} else {
		container.innerHTML += elementBlock;
	}
}
