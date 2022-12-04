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


console.log(x());
