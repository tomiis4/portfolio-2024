import {useState} from 'react'
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
	ratio?: string,
	height: number,
	content: Content
}


const getSize = (ratio: string | undefined, height: number): number[] => {
	if (!ratio) { ratio = '16-9' }

	const [widthR, heightR] = ratio.split('-')
	const k = height / parseInt(heightR)

	return [k * parseInt(widthR), k * parseInt(heightR)]
}

const Slide = (e: SlideT) => {
	const [width, height] = getSize(e.ratio, e.height)
	const [isActive, setIsActive] = useState<boolean>(false)

	return (
		<div 
			style={{
				width: `${width}px`,
				height: `${height}px`,
			}}  
			className={isActive ? 'slide active' : 'slide'} 
			id={e.id.toString()}
			onClick={()=>isActive ? setIsActive(false) : setIsActive(true)}
		>
			<div className='slide-number center'>
				{e.id + 1}
			</div>
		</div>
	)
}

export default Slide;
