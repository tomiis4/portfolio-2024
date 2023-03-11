type GradientT = {
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	colors: string[]
}

const Gradient = (e: GradientT):CanvasGradient => {
	const gradient = e.ctx.createLinearGradient(0, 0, e.width, e.height);
	const len = 1 / e.colors.length;

	e.colors.forEach((color, index) => {
		gradient.addColorStop(len * index, color)
	})

	return gradient;
}

export default Gradient;
