import {read} from "fs";
const fs = require('fs');

const initPath = './init.tes';
let settingsData: any = {};

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

	for (let i=0; i < dataArray.length; i++) {
		const fileLine = dataArray[i].trim();
		
		// check for comments
		if (fileLine.split('')[0] == '#') {
			return;
		}
		
		// check for variables
		if (fileLine.startsWith('var')) {
			const fileString = fileLine.replace(' ', '');
			
			const variableKey = fileString.match(/<(.*?)>/g)![0].replace(/<|>/g, '');
			const variableValue = fileString.match(/("|'|`)(.*?)("|'|`)/g)![0].replace(/'|"|`/g, '');
			
			settingsData[variableKey] =  variableValue;
		}
	}
}


const main = () => {
	parseSettings();
}
main();


export default settingsData;
