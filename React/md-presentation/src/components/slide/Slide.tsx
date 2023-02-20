import './slide.scss'

type Header = {
	content: string,
	position: number[]
	fontSize?: number,
	fontFamily?: number,
	color?: string,
	background?: string
}

type Paragraph = {
	content: string,
	position: number[]
	fontSize: number,
	fontFamily: number,
	color: string,
	background: string
}

type Image = {
	source: string,
	position: number[]
	width: number,
	height: number,
}

type Content = {
	headers?: Header[],
	paragraphs?: Paragraph[],
	images?: Image[],
}

type SlideT = {
	id: number
	ratio: number,
	height: number,
	content: Content
}


const getSize = (ratio: number, height: number): number[] => {
	const [heightR, widthR] = ratio.toString().split('')
	const k = height / parseInt(heightR)
	
	return [k * parseInt(widthR), k * parseInt(heightR)]
}

const Slide = (e: SlideT) => {
	const [width, height] = getSize(e.ratio, e.height)

	return (
		<div 
			style={{
				width: `${width}px`,
				height: `${height}px`,
			}}  
			className='slide' 
			id={e.id.toString()}
		>
		</div>
	)
}

export default Slide;
