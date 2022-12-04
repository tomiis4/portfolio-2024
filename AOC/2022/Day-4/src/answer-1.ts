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

// const getNumbers = (num1: number, num2: number): number[] => {
// 	let arr: number[] = [];
	
// 	if (num1 == num2) return [num1];
	
// 	for (let i = num1; i <= num2; i++) {
// 		arr.push(i);
// 	}
	
// 	return arr;
// }

// const isIncluded = (arr1: number[], arr2: number[]): boolean => {
// 	if (arr1.join(',').includes(arr2.join(',')) || arr2.join(',').includes(arr1.join(','))) {
// 		console.log(arr1.join(',').replace(arr2.join(','), ''))
// 		return true;
// 	} else {
// 		return false;
// 	}
// }

const getValues = () => {
	const data = dataArray();
	let count: number = 0;
	
	data.forEach((value) => {
		if (value=='') return;
		
		const range1 = value.split(',')[0];
		const range2 = value.split(',')[1];
		
		const rg11 = range1.split('-')[0]
		const rg12 = range1.split('-')[1]
		
		const rg21 = range2.split('-')[0]
		const rg22 = range2.split('-')[1]
		
		console.log(range1,  rg11, rg12, range2, rg21, rg22)

		// if (
		// 	(rg11 >= rg21 && rg12 <= rg22)
		// 	|| (rg21 >= rg11 && rg22 <= rg12)
		// ) {
		// 	count++;
		// }
		if ((rg11 <= rg21 && rg12 >= rg22) || (rg21 <= rg11 && rg22 >= rg12)) {
			count++;
		}	
		// const numRange1 = getNumbers(parseInt(range1.split('-')[0]), parseInt(range1.split('-')[1]));
		// const numRange2 = getNumbers(parseInt(range2.split('-')[0]), parseInt(range2.split('-')[1]));
		
		// if (isIncluded(numRange1, numRange2)) {
		// 	count++;
		// } else {
		// 	count;
		// }
	});
	
	return count;
}


console.log(getValues());
