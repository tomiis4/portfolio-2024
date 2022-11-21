import {read} from "fs";
const fs = require('fs');

const initPath = './init.tes';
let settingsArray: any = {};

const readSettings = () => {
	try { 
		const data = fs.readFileSync(initPath, 'utf8');
		return data.split(/\r?\n/); 
	} catch (err) {
		console.error(err);
	}
}

const parseSettings = () => {
	const dataArray: string[] = readSettings();

	dataArray.forEach((value) => {
		const fileLine = value.trim();
		
		// check for comments
		if (fileLine.split('')[0] == '#') {
			return;
		}
		
		// check for variables
		if (fileLine.startsWith('var')) {
			const fileString = fileLine.replace(' ', '');
			
			const variableKey = fileString.match(/<(.*?)>/g)![0].replace(/<|>/g, '');
			const variableValue = fileString.match(/("|'|`)(.*?)("|'|`)/g)![0].replace(/'|"|`/g, '');
			
			settingsArray[variableKey] =  variableValue;
		}
	});
}


const main = () => {
	parseSettings();
	console.log(settingsArray)
}
main();


export default settingsArray;
