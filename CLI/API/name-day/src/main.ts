const express = require('express');
const app = express();

import nameObj from './data/names'


app.post('/api', (req: any, res: any) => {
	const date = new Date();
	
	// const dayName = date.getDay();
	// const year = date.getFullYear();
	const day = date.getDate();
	const month = date.getMonth()+1;
	
	const name: string | string[]= nameObj[`${day}-${month}`];
	
	if (typeof name != 'string') {
		res.status(200).send(name.toString());
	} else {
		res.status(200).send(name);
	}
})

app.listen(5050, () => {
	console.log('[SEVER] Server just started');
})
