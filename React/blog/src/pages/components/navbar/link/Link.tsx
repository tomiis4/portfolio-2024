import '../navbar.scss';
import { useEffect, useState } from 'react';
import {NavLink} from "react-router-dom";

type LinkArg = {
	to: string,
	name: string,
	id: number,
	isActive: boolean,
	function: Function
};

function Link(e: LinkArg) {
	const [style, setStyle] = useState('link');

	useEffect(() => {
		e.isActive ? setStyle('link active') : setStyle('link');
	})

	return (
		<>
			<NavLink to={e.to}>
				<a href={e.to} className={style} onClick={() => e.function(e.id)}>
					{ e.name }
				</a>
			</NavLink>
		</>
	);
}

export default Link;

