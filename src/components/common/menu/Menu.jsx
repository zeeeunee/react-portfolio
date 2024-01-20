import { useEffect, useCallback } from 'react';
import './Menu.scss';
import { useGlobalData } from '../../../hooks/useGlobalData';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Menu() {
	const { MenuOpen, setMenuOpen } = useGlobalData();
	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && setMenuOpen(false);
	}, [setMenuOpen]);

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, [closeMenu]);
	return (
		<>
			{MenuOpen && (
				<aside className='Menu' onClick={() => setMenuOpen(false)}>
					<h1>Menu</h1>
					<ul>
						<li>
							<Link to='/department'>Department</Link>
						</li>
						<li>
							<Link to='/youtube'>Youtube</Link>
						</li>
						<li>
							<Link to='/gallery'>Gallery</Link>
						</li>
						<li>
							<Link to='/community'>Community</Link>
						</li>
						<li>
							<Link to='/members'>Members</Link>
						</li>
						<li>
							<Link to='/contact'>Contact</Link>
						</li>
					</ul>
				</aside>
			)}
		</>
	);
}
