import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import { TiThMenu } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/action';
export default function Header({ Dark, setDark }) {
	const dispatch = useDispatch();
	const Toggle = useSelector(store => store.menuReducer.menu);
	return (
		<header className='Header'>
			<h1>
				<Link to='/'>ZEEEUNEE</Link>
			</h1>

			<div className='menu'>
				<div className='darkToggle'>
					<div className={`themeBox ${Dark && 'dark'}`} onClick={() => setDark(!Dark)}>
						<div className='ball'></div>
					</div>
				</div>
				<ul>
					<li>
						<NavLink to='/department' activeClassName={'on'}>
							Department
						</NavLink>
					</li>
					<li>
						<NavLink to='/youtube' activeClassName={'on'}>
							Youtube
						</NavLink>
					</li>
					<li>
						<NavLink to='/gallery' activeClassName={'on'}>
							Gallery
						</NavLink>
					</li>
					<li>
						<NavLink to='/community' activeClassName={'on'}>
							Community
						</NavLink>
					</li>
					<li>
						<NavLink to='/members' activeClassName={'on'}>
							Members
						</NavLink>
					</li>
					<li>
						<NavLink to='/contact' activeClassName={'on'}>
							Contact
						</NavLink>
					</li>
				</ul>
				<button className='menuToggle' onClick={() => dispatch({ type: types.MENU.start, payload: !Toggle })}>
					<TiThMenu className='menuIcon' />
				</button>
				{/* <div className={`themeBox ${Dark && 'dark'}`} onClick={() => setDark(!Dark)}>
					<div className='ball'></div>
				</div> */}
			</div>
		</header>
	);
}
