import Slide from '../../../components/slide/Slide'
import '../create.scss'


// <Slide id={0} width={200} height={200} content={ headers: [{"X", [1,2],}] } >



const Slides = () => {
const content = {
	headers: [
		{
			content: "Hello",
			position: [0,0],
		}
	]
}
	return (
		<div className='slides center'>
			<div className='slides-wrapper center'>
				<Slide id={0} height={100} ratio={49} content={content} />
				<Slide id={0} height={100} ratio={49} content={content} />
				<Slide id={0} height={100} ratio={49} content={content} />
			</div>
		</div>
	)
}

export default Slides;
