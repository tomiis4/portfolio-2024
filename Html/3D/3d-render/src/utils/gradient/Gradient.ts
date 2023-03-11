import { GradientArg } from "../Types";

const Gradient = (e: GradientArg):CanvasGradient => {
	const gradient = e.ctx.createLinearGradient(0, 0, e.width, e.height);
	const len = 1 / e.colors.length;

	e.colors.forEach((color, index) => {
		gradient.addColorStop(len * index, color)
	})

	return gradient;
}

export default Gradient;
