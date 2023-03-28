import './scss/style.scss';

import Parser from './utils/parser/Parser';
import Rotate from './utils/rotate/Rotate';
import ProjectVeretex from './utils/project-vertex/ProjectVertex';
import Texture from './utils/texture/Texture';
import Gradient from './utils/gradient/Gradient';

import { ModelData, Model, FaceArg, Camera } from './utils/Types';
import SortFaces from './utils/sort-faces/SortFaces';

const canvas = document.querySelector('canvas');
const ctx = canvas!.getContext('2d');
const width = window.innerWidth * 0.9, height = window.innerHeight * 0.9;

canvas!.width = width;
canvas!.height= height;


// global data
const camera: Camera = {
	position: [0, 0, -5],
	focal_length: 15
}

// models
const parsed_model = await Parser('./src/objects/tree.obj');

const model_data: ModelData = {
	vertices: parsed_model.vertices,
	faces: parsed_model.faces,
	// texture: Texture({
	// 	faces: parsed_model.faces,
	// 	baseColor: '#000',
	// 	specialType: 'fade'
	// })
	texture: Texture({
		faces: parsed_model.faces,
		baseColor: Gradient({
			colors: [ '#1f4037', '#1f4037', '#99f2c8', '#99f2c8'],
			ctx: ctx!,
			width: width,
			height: height
		})
	})
}

let model: Model = {
	rotation: [1.54, 1.54, 1.54],
	position: [width/2-200, height/2],
	scale: 30,
	stroke: 1.5
}


// -- GLOBAL FUNCTIONS --

const DrawModel = (e:{data:ModelData, model:Model}) => {
	const { data, model } = e
	const [x,y,z] = model.rotation;

	const rotate_x = Rotate('x', x, data.vertices);
	const rotate_y = Rotate('y', y, rotate_x);
	const rotate_z = Rotate('z', z, rotate_y);

	const faces = SortFaces({
		camera: camera,
		vertices: rotate_z,
		faces: data.faces
	});

	for (let i=0; i < faces.length; i++) {
		const face = faces[i];
		const texture = data.texture[i];

		DrawFace({
			vertices: rotate_z,
			face: face,
			model: model,
			texture: texture
		});
	}
}

const DrawFace = (e: FaceArg) => {
	const [x,y] = e.model.position;
	const scale = e.model.scale;
	const transparent = e.model.transparent;
	const stroke = e.model.stroke;

	ctx!.beginPath();


	// color & transparent
	ctx!.globalAlpha = transparent ?? 1;
	ctx!.fillStyle = e.texture;

	// stroke
	ctx!.lineWidth = stroke ?? 0;
	ctx!.strokeStyle = '#FFFFFF';

	// +1 for drawing to first vertex
	const face_len = e.face.length;
	for (let i=0; i < face_len+1; i++) {
		const vertex = e.vertices[ e.face[ i%face_len ]-1 ];
		const [projected_x, projected_y] = ProjectVeretex(vertex, camera);

		ctx!.lineTo(
			projected_x * scale + x, 
			projected_y * scale + y
		);
	}


	stroke ? ctx!.stroke() : null;
	ctx!.fill();
}


// -- PROJECT FUNCTIONS --
const project_model = () => {
	DrawModel({
		data: model_data,
		model: model
	});
}


const xI = document.querySelector('#x')
const yI = document.querySelector('#y')
const zI = document.querySelector('#z')

const loop = () => {
	ctx!.clearRect(0,0, width, height);

	// controls (delete)
	// @ts-ignore
	model.rotation[0] = parseInt(xI.value) /10
	// @ts-ignore
	model.rotation[1] = parseInt(yI.value) /10
	// @ts-ignore
	model.rotation[2] = parseInt(zI.value) /10


	project_model();

	window.requestAnimationFrame(loop);
}

window.requestAnimationFrame(loop);
