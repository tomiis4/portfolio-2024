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

const isDuplicate = (arr: any[]) => {
	for (let i=0; i < arr.length; i++) {
		const value = arr[i];
		
		if (arr.indexOf(value) != arr.lastIndexOf(value)) {
			return true;
		} else {
			return false;
		}
	}
}

const getValues = () => {
	const data = dataArray()[0].split('');
	
	let i=0;
	let beforeData: string[] = [];
	let result: null | number = null;
	let currentLetter = '';
	
	data.forEach((letter, index) => {
		i++;
		if (beforeData.length == 4) {
			beforeData.shift();
			beforeData.push(letter)
			
			if (isDuplicate(beforeData) == false && index > 6) {
				result = index+1;
				console.log(i, letter, index, beforeData[0], currentLetter, result)
			}
		} else {
			beforeData.push(letter)
		}
	})
	
	return [result, i];
}


console.log(getValues());
