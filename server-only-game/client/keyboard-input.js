const stdin = process.stdin;

stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

module.exports = () => {
	let keyInputed = 0;
	let keys = [];

	stdin.on('data', (key) => {
		if (keyInputed < 2 && key <= 2 && key >= 0 && key != ' ') {
			keys.push(key.parseInt());
			keyInputed++;

			if (keys.length == 2) {
				console.log(keys);
				process.exit();
			}
		}
	})
}


/*
  ! Log after each key pressed 
  console.log(key);
  
  ! Normal text-writing
  process.stdout.write( key );
*/
