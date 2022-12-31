import fs from 'node:fs';

let dataPoints = 0;

const dataArray = (): string[] => {
	try {
		const data = fs.readFileSync('./list.txt', 'utf8');
		return data.split(/\r?\n/);
	} catch (err) {
		console.log(err);
		return [''];
	}
}

const addPoints = (type: string) => {
	switch (type) {
		case 'X':
		case 'A':
			dataPoints += 1;
			break;
		
		case 'Y':
		case 'B':
			dataPoints += 2;
			break;
		
		case 'Z':
		case 'C':
			dataPoints += 3;
			break;
		default:
			return;
	}
}

const getPoints = () => {
	const data = dataArray();
	
	data.forEach((value) => {
		const enemyValue = value.split('')[0];
		const myValue = value.split('')[2];
		
		// win
		if (
			(enemyValue == 'A' && myValue == 'Y')
			|| (enemyValue == 'B' && myValue == 'Z')
			|| (enemyValue == 'C' && myValue == 'X')
		) {
			dataPoints += 6;
			addPoints(myValue);
		} 
		
		// tie
		else if (
			(enemyValue == 'A' && myValue == 'X')
			|| (enemyValue == 'B' && myValue == 'Y')
			|| (enemyValue == 'C' && myValue == 'Z')
		) {
			dataPoints += 3;
			addPoints(myValue);
		}
		
		// lost
		else {
			addPoints(myValue);
		}
	})
}

getPoints()
console.log(dataPoints);
