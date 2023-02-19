import {useEffect, useState} from 'react'
import './slide.scss'

type Header = {
	content: string,
	position: number[]
	fontSize: number,
	fontFamily: number,
	color: string,
	background: string
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
	width: number,
	height: number,
	content: Content
}

const [style, setStyle] = useState({})


const Slide = (e: SlideT) => {
	useEffect(() => {
		setStyle({
			width: `${e.width}px`,
			height: `${e.height}px`,
		})
	}, [])

	return (
		<div style={style} className='slide' id={e.id.toString()}>
		</div>
	)
}

export default Slide;
