import './blogs.scss'

type CodeArg = {
	content: string,
	fileName: string
}

function Code(e: CodeArg) {
	function syntaxHighlight(code: string): string {
		type Syntax = 'function' | 'variable' | 'character'

		const keywordStyles: { [key: string]: Syntax} = {
			function: 'function',
			func: 'function',
			if: 'function',
			else: 'function',
			for: 'function',
			while: 'function',
			switch: 'function',
			case: 'function',
			break: 'function',
			import: 'function',
			as: 'function',
			package: 'function',
			return: 'function',
			type: 'function',
			let: 'variable',
			var: 'variable',
			const: 'variable',
			mut: 'variable',
			local: 'variable',
			'=': 'character',
			'==': 'character',
			'===': 'character',
			'!==': 'character',
			'!=': 'character',
			'*=': 'character',
			'/=': 'character',
			'+=': 'character',
			'-=': 'character',
			'=>': 'character',
			'=<': 'character',
			':=': 'character',
			'|': 'character',
			'||': 'character',
			'&': 'character',
			'&&': 'character',
			'%': 'character',
			':': 'character',
			'+': 'character',
			'++': 'character',
			'-': 'character',
			'--': 'character',
			'>': 'character',
			'<': 'character'
		};

		// Define the regular expressions for matching comments and strings
		const commentRegex = /\/\/.*|\/\*[\s\S]*?\*\//g;
		const stringRegex = /("|').*?\1/g;
		const numberRegex = /[0-9]/g;
		const varNameRegex = /(let|var|const)\s+([a-zA-Z_]\w*)\s*=/g;
		const functionNameRegex = /(?<!\.)\b([^(\s]*)\(/g;
		const objectRegex = /(?<=\.)[a-zA-Z]+/g;

		let placeholders: string[] = [];
		code = code.replace(numberRegex, (match) => {
			const placeholder = `___NUMBER_${placeholders.length}___`;
			placeholders.push(`<span class="number">${match}</span>`);
			return placeholder;
		});

		code = code.replace(commentRegex, (match) => {
			const placeholder = `___COMMENT_${placeholders.length}___`;
			placeholders.push(`<span class="comment">${match}</span>`);
			return placeholder;
		});

		code = code.replace(stringRegex, (match) => {
			const placeholder = `___STRING_${placeholders.length}___`;
			placeholders.push(`<span class="string">${match}</span>`);
			return placeholder;
		});

		code = code.replace(varNameRegex, (match) => {
			const placeholder = `___VARIABLENAME_${placeholders.length}___`;
			const splited = match.split(' ');

		placeholders.push(`<span class="variable">${splited[0]}</span> <span class="var-name">${splited[1]}</span> <span class="character">${splited[2]}</span>`);
			return placeholder;
		});

		code = code.replace(functionNameRegex, (match) => {
			const placeholder = `___FUNCTIONNAME_${placeholders.length}___`;
			let name = match.split(''); name.pop();
			name = name.join('').split('.');

			placeholders.push(`<span class="func-name">${name[0]}</span>${name[1]? `.<span class="var-name">${name[1]}</span>` : ''}(`);
			return placeholder;
		});

		code = code.replace(objectRegex, (match) => {
			const placeholder = `___OBJECTKEY_${placeholders.length}___`;
			placeholders.push(`<span class="variable">${match}</span>`);
			return placeholder;
		});



		// Split the code into individual lines and tokens
		const lines = code.split('\n');
		let html = '';

		for (let i = 0; i < lines.length; i++) {
			const tokens = lines[i].split(/([\s{}()[\],;])/);

			html += `${i+1}&nbsp;&nbsp;`;

			for (let j = 0; j < tokens.length; j++) {
				const token = tokens[j];

				if (keywordStyles[token]) {
					const style = keywordStyles[token];
					html += `<span class="${style}">${token}</span>`;
				} else {
					html += token;
				}
			}

			html += '<br>';
		}

		placeholders.forEach((placeholder, i) => {
			const regex = new RegExp(`___(COMMENT|STRING|NUMBER|VARIABLENAME|FUNCTIONNAME|OBJECTKEY)_${i}___`, 'g');
			html = html.replace(regex, placeholder);
		});

		return html;
	}

	function handleCopy() {
		navigator.clipboard.writeText(e.content.replaceAll('&nbsp;', ' '));
	}

	return (
		<div className='code-wrapper'>
			<h3 className='filename'> {e.fileName} </h3>
			<hr />
			<div className='code' dangerouslySetInnerHTML={{__html: syntaxHighlight(e.content)}}>
			</div>
			<input type='button' value={'copy'} onClick={handleCopy} />
		</div>
	)
}

export default Code;
