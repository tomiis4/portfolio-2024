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
		if (myValue == 'Z') {
			switch (enemyValue) {
				case 'A':
					addPoints('Y');
					break;
				case 'B':
					addPoints('Z');
					break;
				case 'C':
					addPoints('X');
					break;
				default:
					return;
			}
			dataPoints += 6;
		}
		
		// tie
		else if (myValue == 'Y') {
			switch (enemyValue) {
				case 'A':
					addPoints('X');
					break;
				case 'B':
					addPoints('Y');
					break;
				case 'C':
					addPoints('Z');
					break;
				default:
					return;
			}
			dataPoints += 3;
		}
		
		// lost
		else if (myValue == 'X') {
			switch (enemyValue) {
				case 'A':
					addPoints('Z');
					break;
				case 'B':
					addPoints('X');
					break;
				case 'C':
					addPoints('Y');
					break;
				default:
					return;
			}
		}
	})
}

getPoints()
console.log(dataPoints);
