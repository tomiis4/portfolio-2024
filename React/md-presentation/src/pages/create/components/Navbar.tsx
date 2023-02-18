import '../create.scss'

import Link from '../../../components/link/Link';

const Navbar = () => {
	return (
		<nav>
			<ul>
				<Link to='#' icon='home' name='Home' /> <hr />
				<Link to='#' icon='add' name='New' /> <hr />
				<Link to='#' icon='undo' name='Undo' /> <hr />
				<Link to='#' icon='redo' name='Redo' /> <hr />
				<Link to='#' icon='share' name='Share' />
			</ul>
		</nav>
	)
}

export default Navbar;
