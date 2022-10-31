const container = document.getElementById('container');
const board = [
	[0, 0], [1, 0], [2, 0], [3, 0], [4, 0],
	[0, 1], [1, 1], [2, 1], [3, 1], [4, 1],
	[0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
	[0, 3], [1, 3], [2, 3], [3, 3], [4, 3],
	[0, 4], [1, 4], [2, 4], [3, 4], [4, 4],
];
const height = 100;

for (let i=0; i<board.length; i++) {
	const x = board[i][0];
	const y = board[i][1];
	const calcX = (x * 1 + y * -1) * (height / 2);
	const calcY = (x * 0.5 + y * 0.5) * (height / 2);

	container.innerHTML += `<div style="top: ${calcY+height}px; left: ${calcX + height*2}px" id="grass"> </div>`;
}

