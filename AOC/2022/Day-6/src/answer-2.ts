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

const moveValue = (row: number, fromColumn: number, toColumn: number, containers: string[][]): string[][] => {
	let newContainer: string[][] = containers;
	
	let movedValue: string[] = [];
	let newColumn: string[] = [];
	
	for (let i=0; i < row; i++) {
		movedValue.push(containers[fromColumn-1][i]);
	}
	movedValue.reverse();
	for (let k=0; k < movedValue.length; k++) {
		newColumn = containers[toColumn-1].splice(0,0, movedValue[k]);
		newColumn = containers[toColumn-1]
	}
	
	for (let j=0; j < movedValue.length; j++) {
		newContainer[fromColumn-1].shift();
	}
	
	newContainer[toColumn-1] = newColumn;	
	
	return newContainer;
}

const getValues = () => {
	const data = dataArray();
	
	let containers: string[][] = [];
	let instructions: string[][] = [];
	
	let result = '';
	
	// parse values
	data.forEach((value) => {
		// blocks
		if (value.trim().startsWith('[')) {
			const blockArray = value.replace(/[\[\]]/g, '').replace(/    /g, '-').replace(/ /g, '-').split('-')
			blockArray.forEach((value, index) => {
				if (value != '') {
					if (containers[index]) {
						containers[index].push(value);
					} else {
						containers[index] = [value];
					}
				}
			})
		}
		
		// instructions number
		else if (value.startsWith('move')) {
			const numberArray = value.replace(/[a-z]/g, '').trim().replace(/\s+/g, ',').split(',');
			instructions.push(numberArray);
		}
	});
	
	for (let i=0; i < instructions.length; i++) {
		const arr = instructions[i];
		
		const move = parseInt(arr[0]);
		const from = parseInt(arr[1]);
		const to = parseInt(arr[2]);
		
		containers = moveValue(move, from, to, containers);
	}
	
	
	containers.forEach((arr) => {
		if (arr[0]) {
			result += arr[0];
		}
	})
	
	return result;
}


console.log(getValues());
