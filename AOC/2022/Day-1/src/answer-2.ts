import fs from 'node:fs';


let sortedData: number[] = [];
let currentElf: number = 0;


const dataArray = (): string[] => {
	try {
		const data = fs.readFileSync('./list.txt', 'utf8');
		return data.split(/\r?\n/);
	} catch (err) {
		console.log(err);
		return [''];
	}
}

const sortElfs = () => {
	const data = dataArray();
	
	for (let i=0; i < data.length; i++) {
		if (data[i] == '') {
			currentElf++;
		} else {
			if (sortedData[currentElf]) {
				sortedData[currentElf] = sortedData[currentElf] + parseInt(data[i]);
			} else {
				sortedData[currentElf] = 0;
				sortedData[currentElf] = sortedData[currentElf] + parseInt(data[i]);
			}
		}
	}
}

const getHigest = () => {
	sortElfs();
	
	const data = sortedData.sort((a, b) => b-a);
	const result = data[0] + data[1] + data[2];
	return result;
}

console.log(getHigest());
