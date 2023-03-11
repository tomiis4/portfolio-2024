type V2 = [number,number];
type V3 = [number,number,number];

type TextureArg = {
	faces: number[][],
	baseColor: string | CanvasGradient
	specialType?: 'random' | 'fade' | 'mix'
}

type GradientArg = {
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	colors: string[]
}

type SortFacesArg = {
	camera: Camera,
	vertices: V3[],
	faces: number[][]
}

type ParsedData = {
	vertices: V3[],
	faces: number[][]
}

type FacesArray = {
	index: number,
	distance: number
}

type Model = {
	rotation: V3,
	position: V2,
	scale: number,
	stroke?: number,
	transparent?: number
}

type ModelData = {
	vertices: V3[],
	faces: number[][],
	texture: string[]
}

type FaceArg = {
	face: number[],
	vertices: V3[],
	model: Model,
	texture: string,
}

type Camera = {
	position: V3,
	focal_length: number
}

export type {
	V2, V3,
	TextureArg, GradientArg, FaceArg, SortFacesArg,
	ParsedData, ModelData, Model, FacesArray,
	Camera
};
