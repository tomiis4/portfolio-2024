import fs from 'node:fs';

const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

const dataArray = (): string[] => {
	try {
		const data = fs.readFileSync('./list.txt', 'utf8');
		return data.split(/\r?\n/);
	} catch (err) {
		console.log(err);
		return [''];
	}
}

const getItems = () => {
	const dataArr = dataArray();
	
	let data: string[][] = []; 

	let i = -1;
	let looped = -1;
	
	dataArr.forEach((value) => {
		i++;
		i % 3 == 0 ? looped++ : looped;
		
		if (!data[looped]) {
			data[looped] = [value];
		} else {
			data[looped].push(value);
		}
	});
	
	return data;
}

const findDuplicate = (array1: string[], array2: string[]) => {
	let word: string[] = [];

	array1.forEach((letter) => {
		
		if (array2.indexOf(letter) != -1 && !word.includes(letter)) {
			word.push(array2[array2.indexOf(letter)])
		}
	})
	
	return word;
}

const getValues = () => {
	const items = getItems()
	let result = 0;

	for (let j=0; j < items.length; j++) {
		const value1 = items[j][0].split('');
		const value2 = items[j][1].split('');
		const value3 = items[j][2].split('');
		
		const duplicated1_2 = findDuplicate(value1, value2);
		const duplicated1_3 = findDuplicate(value1, value3);
		
		const finalDuplicate = findDuplicate(duplicated1_2, duplicated1_3);
		result += alphabet.indexOf(finalDuplicate[0]) + 1;
	}
	
	return result;
}

console.log(getValues());
