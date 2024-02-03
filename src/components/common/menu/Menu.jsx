import { useEffect, useCallback, useRef } from 'react';
import './Menu.scss';
import { useDispatch, useSelector } from 'react-redux';
import { menuClose } from '../../../redux/menuSlice';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Menu() {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.menu.open);
	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && dispatch(menuClose());
	}, [dispatch]);

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, [closeMenu]);
	return (
		<>
			{Open && (
				<aside className='Menu' Onclick={() => dispatch(menuClose())}>
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
