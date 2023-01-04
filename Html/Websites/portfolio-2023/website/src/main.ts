import './style/global.scss';

type Letter = {
	letter: string,
	position: number[],
	type: 'welcome' | 'name'
};

const letters: Letter[] = [
	{ letter: 'H', position: [50,84], type: 'welcome' },
	{ letter: 'i', position: [254,-12], type: 'welcome' },
	{ letter: ',', position: [108,68], type: 'welcome' },
	{ letter: 'I', position: [6,29], type: 'welcome' },
	{ letter: `'`, position: [50,24], type: 'welcome' },
	{ letter: 'm', position: [57,105], type: 'welcome' },
	
	{ letter: 'T', position: [-219,105], type: 'name' },
	{ letter: 'o', position: [-356,-19], type: 'name' },
	{ letter: 'm', position: [-57,0], type: 'name' },
	{ letter: 'i', position: [-306,54], type: 'name' },
	{ letter: 'i', position: [-606,106], type: 'name' },
	{ letter: 's', position: [-257,105], type: 'name' },
	{ letter: '.', position: [-500,105], type: 'name' },
];
const defaultLetters: Letter[] = [
	{ letter: 'H', position: [0,0], type: 'welcome' },
	{ letter: 'i', position: [-14,0], type: 'welcome' },
	{ letter: ',', position: [-29,0], type: 'welcome' },
	{ letter: 'I', position: [-16,0], type: 'welcome' },
	{ letter: `'`, position: [-30,0], type: 'welcome' },
	{ letter: 'm', position: [-46,0], type: 'welcome' }
];

let isNormal = false;

const generate = async () => {
	const container = document.querySelector('#main h1');
	
	container!.innerHTML = '';
	for (let i=0; i < letters.length; i++) {
		const [x,y] = letters[i].position;
		const letter = letters[i].letter;
		const type = letters[i].type;
		
		if (type == 'welcome') {
			container!.innerHTML += `<x id="letter-${letter== ',' ? 'comma' : letter== "'" ? 'quote' : letter}" style="left: ${x}px; top: ${y}px"> ${letter} </x>`;
		} else {
			container!.innerHTML += `<y id="letter-${letter== ',' ? 'comma' : letter== "'" ? 'quote' : letter}" style="left: ${x}px; top: ${y}px"> ${letter} </y>`;
		}
	}
	isNormal = false;
}
generate();

const getNormal = () => {
	for (let i=0; i < defaultLetters.length; i++) {
		const [x,y] = defaultLetters[i].position;
		const letter = defaultLetters[i].letter;
		
		const element = document.querySelector(`#letter-${letter== ',' ? 'comma' : letter== "'" ? 'quote' : letter}`);
		
		
		// @ts-ignore
		element.style.left = `${x}px`;
		// @ts-ignore
		element.style.top = `${y}px`;
	}
	isNormal = true;
}

document.addEventListener('click', () => isNormal ? generate() : getNormal())
// document.addEventListener('click', () => getNormal())
