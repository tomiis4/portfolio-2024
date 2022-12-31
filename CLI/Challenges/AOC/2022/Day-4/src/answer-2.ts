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
	let result = 0;
	
	data.forEach((value) => {
		if (value=='') return;
		
		const str1_1= parseInt(value.split("-")[0]);
		const str1_2= parseInt(value.split("-")[1].split(',')[0]); 
		const str2_1= parseInt(value.split("-")[1].split(',')[1]);
		const str2_2= parseInt(value.split("-")[2]);
		
		if (
			(str1_1 < str2_1 && str1_2 < str2_1)
			|| (str1_1 > str2_2 && str1_2 > str2_2)
		) {
			result;
		} else {
			result++;
		}
	})
	
	return result;
}

console.log(getValues());
