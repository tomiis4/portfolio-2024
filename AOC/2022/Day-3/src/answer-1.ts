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

	dataArr.forEach((value) => {
		const halfStr = value.length / 2;
		data.push([value.slice(0, halfStr), value.slice(halfStr, value.length)]);
	});
	
	return data;
}

const getValues = () => {
	const items = getItems()
	let result = 0;
	let isAdded: boolean = false;

	for (let j=0; j < items.length; j++) {
		const value1 = items[j][0].split('');
		const value2 = items[j][1].split('');
		isAdded = false;
		
		value2.forEach((letter) => {
			if (value1.indexOf(letter) != -1 && isAdded == false) {
				isAdded = true;
				
				const alphabetIndex = alphabet.indexOf(letter) +1;
				result += alphabetIndex;
			}
		})
	}
	return result;
}

console.log(getValues());
