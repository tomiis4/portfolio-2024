const container = document.querySelector('.container');

let sortArray = new Array(20);
let currentIndex;

const delay = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

const displayArray = () => {
	container.innerHTML = '';
	
	sortArray.forEach((value) => {
		container.innerHTML += `<div class="item" id="key${value}" style="height: ${value}%"></div>`;
	})
}

const generateArray = () => {
	sortArray = sortArray.fill(0).map(() => Math.round(Math.random() * 100));
	
	displayArray();

	console.log(sortArray);
}

const sortArrayFn = async () => {
	for (let i=0; i<sortArray.length; i++) {
		currentIndex = 1;

		for (let j=0; j<sortArray.length; j++) {
			if (sortArray[currentIndex] < sortArray[currentIndex -1]) {
				const currentArrayValue = sortArray[currentIndex];
				const previousArrayValue = sortArray[currentIndex -1];

				sortArray[currentIndex] = previousArrayValue;
				sortArray[currentIndex -1] = currentArrayValue;
			}

		await delay(2);
		displayArray();

		currentIndex++;
		}
	}
	displayArray();	
}
