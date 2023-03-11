import { TextureArg } from "../Types";

const getHex = () => {
	return '#' + Math.floor(Math.random() * 16777215).toString();
}

const Texture = (e: TextureArg):string[] => {
	const len = e.faces.length;
	const specialType = e.specialType;

	let temp_texture:string[] = [];

	// full color
	if (e.baseColor && !specialType) {
		return new Array(len).fill(e.baseColor);
	}

	while (temp_texture.length != len) {
		if (specialType == 'random') {
			temp_texture.push(getHex());
		}

		if (specialType == 'fade') {
			temp_texture.push(`rgb(
				${255 - temp_texture.length*(255/len)},
				${255 - temp_texture.length*(255/len)},
				${255 - temp_texture.length*(255/len)}
			)`);
		}

		if (specialType == 'mix') {
			const colors = {
				gray: 'rgb(100,100,100)', 
				blue: 'rgb(130,130,180)', 
				green: 'rgb(130,180,130)', 
				red: 'rgb(180,130,130)'
			};

			if (temp_texture.length % 2) {
				temp_texture.push(colors.gray);
			} else {
				// @ts-ignore
				temp_texture.push(colors[e.baseColor] ?? colors.red);
			}
		}
	}

	return temp_texture;
}
export default Texture;
