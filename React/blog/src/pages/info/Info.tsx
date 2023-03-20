import Navbar from '../components/navbar/Navbar';
import './info.scss';

function Info() {
	return (
		<div className='info'>
			<Navbar />
			<div id='about-me'>
				<h1> About me </h1>
			</div>
		</div>
	);
}

export default Info;
