type TextureT = {
	faces: number[][],
	isRandom?: boolean,
	baseColor?: string,
	color: 'red' | 'green' | 'blue' | 'null' 
}

const Texture = (a: TextureT):string[] => {
	let temp_texture:string[] = [];

	if (a.baseColor) {
		return new Array(a.faces.length).fill(a.baseColor);
	}

	if (a.isRandom) {
		const getColor=()=> '#' + Math.floor(Math.random() * 16777215).toString(16)

		while (temp_texture.length != a.faces.length) {
			temp_texture.push(getColor());
		}

		return temp_texture;
	}


	while (temp_texture.length != a.faces.length) {
		const colors = {
			gray: 'rgb(100,100,100)', 
			null: 'rgb(100,100,100)', 
			blue: 'rgb(130,130,180)', 
			green: 'rgb(130,180,130)', 
			red: 'rgb(180,130,130)'
		};

		if (temp_texture.length % 2) {
			temp_texture.push(colors.gray);
		} else {
			temp_texture.push(colors[a.color]);
		}
	}

	return temp_texture;
}
export default Texture;
