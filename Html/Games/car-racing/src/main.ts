import './scss/style.scss'

import Parser from './utils/parser/Parser';
import Texture from './utils/texture/Texture';
import Rotate from './utils/rotate/Rotate';

const canvas = document.querySelector('canvas');
const ctx = canvas!.getContext('2d');
const width = window.innerWidth * 0.9, height = window.innerHeight * 0.9;

canvas!.width = width;
canvas!.height= height;

type V3 = [number,number,number];
type V2 = [number,number];

type Face = {
	vertices: V3[],
	face: number[],
	scale: number,
	color?: string
}

// type Car = {
// 	rotation: V3,
// 	position: V2,
// 	scale: number,
// 	color: 'red' | 'green' | 'blue'
// }

// type Tree = {
// 	rotation: V3,
// 	position: V3,
// 	scale: number,
// }

type Floor = {
	rotation: V3,
	position: V2,
}

type ModelData = {
	vertices: V3[],
	faces: number[][],
	scale: number,
	texture: string[]
}

// models
const parsed_floor = await Parser('./src/objects/floor.obj');
const floor_data: ModelData = {
	vertices: parsed_floor.vertices,
	faces: parsed_floor.faces,
	scale: 1.5,
	texture: Texture({
		faces: parsed_floor.faces,
		baseColor: '#1C1C1C',
		color: 'null'
	})
}

// let players: Car[] = []; // [0] = local player
// let trees: Tree[] = [];
let floor: Floor = {
	rotation: [0,0,0],
	position: [0,0],
}


// -- GLOBAL FUNCTIONS --
const DrawModel = (e: {rotation: V3, data:ModelData}) => {
	const [x,y,z] = e.rotation;

	const rotate_x = Rotate('x', x, e.data.vertices);
	const rotate_y = Rotate('y', y, rotate_x);
	const rotate_z = Rotate('z', z, rotate_y);

	for (let i=0; i < e.data.faces.length; i++) {
		const face = e.data.faces[i];

		DrawFace({
			vertices: rotate_z,
			face: face,
			scale: e.data.scale,
			color: e.data.texture[i]
		})
	}
}

const DrawFace = (e: Face) => {
	ctx!.beginPath();   

	// for each item in one face
	for (let i=0; i < e.face.length; i++) {
		ctx!.fillStyle = e.color ?? 'white';
		const [x,y,_] = e.vertices[e.face[i]-1];

		ctx!.lineTo(x * e.scale, y * e.scale)
	}

	ctx!.fill(); 
}


// -- APPEND FUNCTIONS --
const append_floor = () => {
	DrawModel({
		rotation: floor.rotation,
		data: floor_data,
	})
}

// const append_car = () => {
// 	players.push({
// 		rotation: [0,0,0],
// 		position: [0,0,0],
// 		scale: 5,
// 		color: 'green'
// 	})
// }

// append_car();

// const move_car = (side: 'x'|'z') => {
// 	players[0]
// }

// controls
// document.addEventListener('keydown', (e:KeyboardEvent) => {
// 	switch (e.code) {
// 		case 'KeyW':
// 			// move Z +
// 			break;
// 		case 'KeyS':
// 			// move Z -
// 			break;
// 		case 'KeyA':
// 			// move X -
// 			break;
// 		case 'KeyD':
// 			// move X +
// 			break;
// 		default: return
// 	}
// });

// type V3 = [number,number,number]
// type Face = {
// 	vertices: V3[],
// 	face: number[],
// 	thicknes?: number,
// 	color?: string
// }

// const getTexture =()=> {
// 	let temp_texture:string[] = [];

// 	while (temp_texture.length != faces.length) {
// 		const colors = {
// 			gray: 'rgb(100,100,100)', 
// 			blue: 'rgb(130,130,180)', 
// 			green: 'rgb(130,180,130)', 
// 			red: 'rgb(180,130,130)'
// 		};

// 		if (temp_texture.length % 2) {
// 			temp_texture.push(colors.gray);
// 		} else {
// 			temp_texture.push(colors.red);
// 		}
// 	}

// 	return temp_texture;
// }

// const parsed_data = await Parser('./src/objects/icosphere.obj')

// const vertices: V3[] = parsed_data.vertices;
// const faces = parsed_data.faces;
// const texture = getTexture();


// const draw_object = (rotation: V3) => {
// 	const roatatedX = Rotate('x', rotation[0], vertices)
// 	const roatatedY = Rotate('y', rotation[1], roatatedX)
// 	const verticesR = Rotate('z', rotation[2], roatatedY);

// 	for (let i=0; i < faces.length; i++) {
// 		const face = faces[i];

// 		draw_faces({
// 			face: face,
// 			vertices: verticesR,
// 			color: texture[i]
// 		})
// 	}
// }

// const draw_faces = (e: Face) => {
// 	ctx!.beginPath();   

// 	ctx!.lineWidth = e.thicknes ?? 3;

// 	// for each item in one face
// 	for (let i=0; i < e.face.length; i++) {
// 		ctx!.fillStyle = e.color ?? 'white';
// 		const [x,y,_] = e.vertices[e.face[i]-1];

// 		ctx!.lineTo(30*x+50, 30*y+50)
// 	}

// 	ctx!.fill(); 
// }

const loop = () => {
	ctx!.clearRect(0,0, width, height);

	append_floor();

	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
