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

const isDuplicate = (arr: any[]) => {
	let isDuplicateArr = [];
	for (let i=0; i < arr.length; i++) {
		let value = arr[i];
		
		if (arr.indexOf(value) == i && arr.lastIndexOf(value) == i) {
			isDuplicateArr.push(true);
		} else {
			isDuplicateArr.push(false);
		}
	}
	
	return isDuplicateArr.includes(false) ? true : false;
}

const getValues = () => {
	const data = dataArray()[0].split('');
	
	let beforeData: string[] = [];
	let result: null | number = null;
	
	data.forEach((letter, index) => {
		if (beforeData.length == 14) {
			beforeData.shift();
			beforeData.push(letter)
			
			if (isDuplicate(beforeData) == false) {
				if (result == null) {
					result = index+1;
				}
			}
		} else {
			beforeData.push(letter)
		}
	})
	
	return result;
}


console.log(getValues());
