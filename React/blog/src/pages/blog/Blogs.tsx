import './blogs.scss'
import Navbar from "../components/navbar/Navbar";

function Blog() {
	const code = `" Returns true if the color hex value is light
		function! IsHexColorLight(color) abort
			let l:raw_color = trim(a:color, '#')

			let l:red = str2nr(substitute(l:raw_color, '(.{2}).{4}', '1', 'g'), 16)
			let l:green = str2nr(substitute(l:raw_color, '.{2}(.{2}).{2}', '1', 'g'), 16)
			let l:blue = str2nr(substitute(l:raw_color, '.{4}(.{2})', '1', 'g'), 16)

			let l:brightness = ((l:red * 299) + (l:green * 587) + (l:blue * 114)) / 1000

			return l:brightness > 155
		endfunction
	`
	const paragraphs = [`Bionic reading is a type of reading that uses technology to enhance the reading experience for people with reading difficulties or disabilities. The goal of bionic reading is to improve reading speed, comprehension, and enjoyment for people who struggle with traditional reading methods.`, `Bionic reading can be especially helpful for people with dyslexia, ADHD, or other reading difficulties, as well as for people with visual impairments or other disabilities that make traditional reading methods challenging.`]; 

	const bionicReading = (text: string) => {
		const words = text.split(' ');

		// For each word, split it into two halves and wrap the first half in a <b> tag
		const formattedWords = words.map(word => {
			if (word.includes('<code>') && word.includes('</code>')) return word

			const firstHalf = word.split("").slice(0, Math.ceil(word.length / 2)).join("");
			const secondHalf = word.split("").slice(Math.ceil(word.length / 2), word.length).join("");
			return `<b>${firstHalf}</b>${secondHalf}`;
		});

		return formattedWords.join(' ');
	}

	// const parseCode = (code: string) => {
	// 	const lines = code.split('\n');
	// 	let parsed = '';

	// 	lines.forEach(line => {
	// 		const letters = line.split('');

	// 		letters.forEach(letter => {
	// 			if ([">", "<", "=", "+", "-"].includes(letter)) {
	// 				parsed += `<f className='character'>${letter}</f>`
	// 			}
	// 		})
	// 	})
		
	// 	return parsed
	// }

	function formatCode(code: string) {
  // Define the regex patterns to match different types of tokens
const stringRegex = /"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g;
  const characterRegex = /&&|\|\||[<>+\-*=]=?/g;
  const functionRegex = /[a-zA-Z_]\w*\s*(?=\()/g;
  const variableRegex = /[a-zA-Z_]\w*(?!\s*\()/g;
  const numRegex = /\b\d+(?:\.\d+)?\b/g;

  // Replace each matched token with a formatted <span> tag
  const formattedCode = code
    .replace(stringRegex, '<span className="string"> $& </span>')
    .replace(characterRegex, '<span className="character"> $& </span>')
    .replace(functionRegex, '<span className="func"> $& </span>')
    .replace(variableRegex, '<span className="var"> $& </span>')
    .replace(numRegex, '<span className="num"> $& </span>');

  // Wrap the formatted code in <f> tags
  console.log(formattedCode)
  return formattedCode;
}

	return (
		<>
			<Navbar/>
			<div className="blog">
				<h1> Bionic reading </h1>
				{
					paragraphs.map(p => {
						return <p dangerouslySetInnerHTML={{__html: bionicReading(p)}}></p>
					})
				}
				<p className='code' dangerouslySetInnerHTML={{__html: formatCode(code)}}>
				</p>
			</div>
		</>
	)
}

export default Blog;
