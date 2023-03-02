import './scss/style.scss'

import Parser from './utils/parser/Parser';

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

const rotate_cube = (dir: 'x'|'y'|'z', theta:number, vertices_arg: V3[]) => {
	const sin_t = Math.sin(theta);
	const cos_t = Math.cos(theta);

	let new_vertices = [...vertices_arg];

	new_vertices.forEach((arr,index) => {
		const [x,y,z] = arr;
		let [x1,y1,z1]: V3 = [...arr];

		if (dir == 'x') {
			y1 = y*cos_t - z*sin_t
			z1 = y*sin_t + z*cos_t
		}

		if (dir == 'y') {
			x1 = x*cos_t + z*sin_t
			z1 = -x*sin_t + z*cos_t
		}

		if (dir == 'z') {
			x1 = x*cos_t - y*sin_t
			y1 = x*sin_t + y*cos_t
		}

		new_vertices[index] = [x1,y1,z1]
	});

	return new_vertices;
}


let scale = 20.00;
let center = 50.00;

const parsed_data = await Parser('./src/objects/car.obj')

const vertices: V3[] = parsed_data.vertices;
const faces = parsed_data.faces;
const texture = getTexture();


const draw_cube = (rotation: V3) => {
	const roatatedX = rotate_cube('x', rotation[0], vertices)
	const roatatedY = rotate_cube('y', rotation[1], roatatedX)
	const verticesR = rotate_cube('z', rotation[2], roatatedY);

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
	draw_cube([
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
