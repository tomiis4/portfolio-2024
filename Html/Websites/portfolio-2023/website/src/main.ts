import './style/global.scss';

type Letter = {
	letter: string,
	position: number[]
};

const letters: Letter[] = [
	{ letter: 'H', position: [50,84] },
	{ letter: 'i', position: [254,-12] },
	{ letter: ',', position: [108,68] },
	{ letter: 'I', position: [6,29] },
	{ letter: `'`, position: [50,24] },
	{ letter: 'm', position: [57,105] }
];
const defaultLetters: Letter[] = [
	{ letter: 'H', position: [0,0] },
	{ letter: 'i', position: [-14,0] },
	{ letter: ',', position: [-29,0] },
	{ letter: 'I', position: [-16,0] },
	{ letter: `'`, position: [-30,0] },
	{ letter: 'm', position: [-46,0] }
];

let isNormal = false;

const generate = async () => {
	const container = document.querySelector('#main h1');
	
	container!.innerHTML = '';
	for (let i=0; i < letters.length; i++) {
		const [x,y] = letters[i].position;
		const letter = letters[i].letter;
		
		container!.innerHTML += `<x id="letter-${letter== ',' ? 'comma' : letter== "'" ? 'quote' : letter}" style="left: ${x}px; top: ${y}px"> ${letter} </x>`;
	}
	isNormal = false;
}
generate();

const getNormal = () => {
	for (let i=0; i < defaultLetters.length; i++) {
		const [x,y] = defaultLetters[i].position;
		const letter = defaultLetters[i].letter;
		
		const element = document.querySelector(`#letter-${letter== ',' ? 'comma' : letter== "'" ? 'quote' : letter}`);
		
		console.log(element,x,y, element.style.left)
		
		// @ts-ignore
		element.style.left = `${x}px`;
		// @ts-ignore
		element.style.top = `${y}px`;
	}
	isNormal = true;
}

document.addEventListener('click', () => isNormal ? generate() : getNormal())
// document.addEventListener('click', () => getNormal())
