import { useEffect, useCallback, useRef } from 'react';
import './Menu.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/action';

export default function Menu() {
	const closeMenu = useCallback(() => {
		window.innerWidth >= 1000 && setToggle(false);
	}, [setToggle]);

	useEffect(() => {
		window.addEventListener('resize', closeMenu);
		return () => window.removeEventListener('resize', closeMenu);
	}, [closeMenu]);
	return (
		<>
			{Toggle && (
				<aside className='Menu' onClick={() => dispatch({ type: types.MENU.start, payload: false })}>
					<h1>Mobile Menu</h1>
				</aside>
			)}
		</>
	);
}
