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
		
		if ((rg11 <= rg21 && rg12 >= rg22) || (rg21 <= rg11 && rg22 >= rg12)) {
			count++;
		}	
	});
	
	return count;
}


console.log(getValues());
