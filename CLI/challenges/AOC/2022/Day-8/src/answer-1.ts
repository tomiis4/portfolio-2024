import fs from 'node:fs';

const dataArray = (): string[] => {
	try {
		const data = fs.readFileSync('./list.txt', 'utf8');
		return data.split(/\r?\n/);
	} catch (err) {
		console.log(err);
		return [''];
	}
}

const getGrid = (array: any[]): any[][] => {
	let arr = new Array(array.length).fill(new Array(array[0].length));
	
	array.forEach((line, index) => {
		const lineArr = line.trim().split('');
		
		arr[index] = lineArr;
	})
	
	return arr
}

const getBorders = (arr: any[][]) => {
	let onBorder = 0;
	
	onBorder += ((arr.length-1) * 2) + ((arr[0].length-2) * 2);
	
	return onBorder;
}
// shift, pop => first, last

const getValues = () => {
	const data = dataArray();
	const grid = getGrid(data)
	const borders = getBorders(grid)

	let isWrited: number[][] = [];
	let result = borders;
	
	console.log(borders)

	for (let yGrid=0; yGrid < grid.length; yGrid++) {
		for (let xGrid=0; xGrid < grid[yGrid].length; xGrid++) {
			if (yGrid == 0 || yGrid == grid.length-2 || xGrid == 0 || xGrid == grid[yGrid].length-1) {
				isWrited.push([xGrid, yGrid]);
			}
		}
	}
	
	for (let y=0; y < grid.length; y++) {
		for (let x=0; x < grid[y].length; x++) {
			let horizontal = [];
			for (let i=0; i < grid.length-1; i++) {
				horizontal.push(grid[i][x]);
			}
			
			let left = grid[y].slice(0, x);
			let right = grid[y].slice(x+1);
			
			let top = horizontal.slice(0, y);
			let bottom = horizontal.slice(y+1);
			
			// bottom.shift();
			// right.shift();
			
			// left
			if (!isWrited.join('|').includes(`${x},${y}`)) {
				if ( !left.some((elem) => parseInt(elem) >= parseInt(grid[y][x])) ) {
					// console.log(x,y, 'Left', left)
					result++;
				}
				else if ( !right.some((elem) => parseInt(elem) >= parseInt(grid[y][x])) ) {
					// console.log(x,y, 'Right', right)
					result++;
				}
				else if ( !top.some((elem) => parseInt(elem) >= parseInt(grid[y][x])) ) {
					// console.log(x,y, 'Top', top)
					result++;
				}
				else if ( !bottom.some((elem) => parseInt(elem) >= parseInt(grid[y][x])) ) {
					// console.log(x,y, 'Bottom', bottom)
					result++;
				}
			}
		}
	}
	
	return result;
}

console.clear();
console.log(getValues());
