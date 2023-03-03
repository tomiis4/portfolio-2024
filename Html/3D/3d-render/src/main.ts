import './scss/style.scss'

import Parser from './utils/parser/Parser';
import Rotate from './utils/rotate/Rotate';

const canvas = document.querySelector('canvas');
const ctx = canvas!.getContext('2d');
const width = window.innerWidth * 0.9, height = window.innerHeight * 0.9;

canvas!.width = width;
canvas!.height= height;

type V3 = [number,number,number]
type Face = {
	vertices: V3[],
	face: number[],
	thicknes?: number,
	color?: string
}

const getTexture =()=> {
	let temp_texture:string[] = [];

	while (temp_texture.length != faces.length) {
		const colors = {
			gray: 'rgb(100,100,100)', 
			blue: 'rgb(130,130,180)', 
			green: 'rgb(130,180,130)', 
			red: 'rgb(180,130,130)'
		};

		if (temp_texture.length % 2) {
			temp_texture.push(colors.gray);
		} else {
			temp_texture.push(colors.red);
		}
	}

	return temp_texture;
}


let scale = 20.00;
let center = 50.00;

const parsed_data = await Parser('./src/objects/icosphere.obj')

const vertices: V3[] = parsed_data.vertices;
const faces = parsed_data.faces;
const texture = getTexture();


const draw_object = (rotation: V3) => {
	const roatatedX = Rotate('x', rotation[0], vertices)
	const roatatedY = Rotate('y', rotation[1], roatatedX)
	const verticesR = Rotate('z', rotation[2], roatatedY);

	for (let i=0; i < faces.length; i++) {
		const face = faces[i];

		draw_faces({
			face: face,
			vertices: verticesR,
			color: texture[i]
		})
	}
}

const draw_faces = (e: Face) => {
	ctx!.beginPath();   

	// TODO make "shadows" or texture
	ctx!.lineWidth = e.thicknes ?? 3;

	// for each item in one face
	for (let i=0; i < e.face.length; i++) {
		ctx!.fillStyle = e.color ?? 'white';
		const [x,y,_] = e.vertices[e.face[i]-1];

		ctx!.lineTo((x+center)*scale, (y+center)*scale);
	}

	ctx!.fill(); 
}


const rangeX = document.querySelector('#x');
const rangeY = document.querySelector('#y');
const rangeZ = document.querySelector('#z');

const scaleEl = document.querySelector('#scale');
const centerEl = document.querySelector('#center');

const loop = () => {
	ctx!.clearRect(0,0, width, height);

	// @ts-ignoree
	scale = parseFloat(scaleEl!.value)
	// @ts-ignoree
	center = parseFloat(centerEl.value)

	// // manual
	draw_object([
		// @ts-ignoree
		parseInt( rangeX!.value ) /25,
		// @ts-ignoree
		parseInt( rangeY!.value ) /25,
		// @ts-ignoree
		parseInt( rangeZ!.value ) /25
	])

	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
