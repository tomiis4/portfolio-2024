const text = "hi, how are you?";
const textArr = text.split("");

const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRSTUVWXYZ,.?!- '.split('');

let displayArr: string[] = [];
let currentIndex = 0

const delay = (ms:number) => new Promise(res => setTimeout(res,ms))

const main = async () => {
	// for each letter in array loop trough whole alphabet
	for (let i=0; i < textArr.length; i++) {
		for (let j=0; j < alphabet.length; j++) {
			const letter = alphabet[j];

			// asign current letter to main array
			displayArr[currentIndex] = letter

			// if letter from alphabet is same as original text
			// move on another letter
			if (letter == textArr[currentIndex]) {
				currentIndex++;
			}

			// just print it
			await delay(20);
			console.log(displayArr.join(''));
		}
	}
}

main();
