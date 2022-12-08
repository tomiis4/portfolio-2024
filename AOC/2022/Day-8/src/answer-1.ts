import fs from 'node:fs';

const dataArray = (): string[] => {
	try {
		const data = fs.readFileSync('./test.txt', 'utf8');
		return data.split(/\r?\n/);
	} catch (err) {
		console.log(err);
		return [''];
	}
}

const getGrid = (array: any[]): any[][] => {
	let arr = new Array(array.length).fill(new Array(array[0].length));
	
	array.forEach((line, index) => {
		const lineArr = line.split('');
		
		arr[index] = lineArr;
	})
	
	return arr
}

const getBorders = (arr: any[][]) => {
	let onBorder = 0;
	
	onBorder += ((arr.length-2) * 2) + ((arr[0].length-1) * 2)
	
	return onBorder;
}
// shift, pop => first, last

const getValues = () => {
	const data = dataArray();
	const grid = getGrid(data)
	
	let isWrited = [];
	let result = getBorders(grid);
	

	for (let yGrid=0; yGrid < grid.length; yGrid++) {
		for (let xGrid=0; xGrid < grid[yGrid].length; xGrid++) {
			if (yGrid == 0 || yGrid == grid.length-2) {
				isWrited.push([parseInt(xGrid), parseInt(yGrid)]);
				console.log(isWrited)
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
			let right = grid[y].slice(x);
			
			let top = horizontal.slice(0, x);
			let bottom = horizontal.slice(x);
			top.pop();
			bottom.shift();
			left.pop();
			right.shift();

			// left
			if (
				isWrited.some((arr) => arr[0] == parseInt(x) && arr[1] == parseInt(y))
				
				&& (left.some((elem) => parseInt(elem) >= grid[y][x]) == false
				|| right.some((elem) => parseInt(elem) >= grid[y][x]) == false
				|| top.some((elem) => parseInt(elem) >= grid[y][x]) == false
				|| bottom.some((elem) => parseInt(elem) >= grid[y][x]) == false)
			) {
				// console.clear()
				// console.log(isWrited);
				isWrited.push([x,y]);
				result++;
			}
		}
	}
	
	
	// grid.forEach((arr: any[], index) => {
	// 	if (index==0 || grid.length==index+1) return;
		
		
		
		
	// 	arr.forEach((value, numI) => {
	// 		// const number = parseInt(value);
	// 		const checkLeft = (item: any) =>  parseInt(item) >= parseInt(value[numI]); 

	// 		if (
	// 			!arr.some(checkLeft)
	// 		) {
	// 			console.log('If');
	// 			result++;
	// 		}
	// 		// if (
	// 		// 	// left/right
	// 		// 	(number < arr[numI-1])
	// 		// 	&& (number < arr[numI+1])
				
	// 		// 	// top
	// 		// 	&& (number < grid[index-1][numI-1])
	// 		// 	&& (number < grid[index-1][numI])
	// 		// 	&& (number < grid[index-1][numI+1])
				
	// 		// 	// top bottom
	// 		// 	&& (number < grid[index+1][numI-1])
	// 		// 	&& (number < grid[index+1][numI])
	// 		// 	&& (number < grid[index+1][numI+1])
	// 		// ) {
	// 		// 	console.log('If');
	// 		// 	result++;
	// 		// }
	// 	});
	// });
	
	
	return result;
}

console.clear();
console.log(getValues());
