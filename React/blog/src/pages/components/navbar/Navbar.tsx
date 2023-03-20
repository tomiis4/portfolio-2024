import './navbar.scss';
import { useState } from 'react';
import { FaGithub, FaInstagram } from 'react-icons/fa'
import Link from './link/Link';

function Navbar() {
	const [isActive, setIsActive] = useState([true,false,false]);

	const handleClick = (id: number) => {
		let temp_active = new Array(3).fill(false);
		temp_active[id] = true;

		setIsActive(temp_active)
	}

	return (
		<div className='navbar'>
			<div className='socials'>
				<div className='language'>
					EN
				</div>
					<div className='separate'></div>
				<a href='https://github.com/tomiis4'>
					<FaGithub />
				</a>
					<div className='separate'></div>
				<a href='https://instagram.com/tomii6_'>
					<FaInstagram />
				</a>
			</div>

			<div className='links'>
				<Link 
					id={0}
					to={'#about-me'} 
					name={'Home'} 
					isActive={isActive[0]}
					function={handleClick} 
				/>
				<Link 
					id={1}
					to={'#'} 
					name={'Projects'} 
					isActive={isActive[1]}
					function={handleClick} 
				/>
				<Link 
					id={2}
					to={'#'} 
					name={'Articles'} 
					isActive={isActive[2]}
					function={handleClick} 
				/>
			</div>
		</div>
	);
}

export default Navbar;
