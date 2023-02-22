import Slide from '../../../components/slide/Slide'
import '../create.scss'


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
			<div className='slides-wrapper'>
				<Slide id={0} height={100} content={content} />
				<Slide id={1} height={100} content={content} />
				<Slide id={2} height={100} content={content} />
				<Slide id={3} height={100} content={content} />
				<Slide id={4} height={100} content={content} />
				<Slide id={5} height={100} content={content} />
				<Slide id={6} height={100} content={content} />
				<Slide id={7} height={100} content={content} />
				<Slide id={8} height={100} content={content} />
				<Slide id={9} height={100} content={content} />
			</div>
		</div>
	)
}

export default Slides;
