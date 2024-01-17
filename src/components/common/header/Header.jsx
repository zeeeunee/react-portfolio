import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import { TiThMenu } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { menuToggle } from '../../../redux/menuSlice';
import { darkToggle } from '../../../redux/darkSlice';

export default function Header() {
	const dispatch = useDispatch();
	const Dark = useSelector(store => store.dark.isDark);
	return (
		<header className='Header'>
			<h1>
				<Link to='/'>ZEEEUNEE</Link>
			</h1>
			<section className='menu'>
				<div className='darkToggle'>
					<div className={`themeBox ${Dark && 'dark'}`} onClick={() => dispatch(darkToggle())}>
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
				<button className='menuToggle' onClick={() => dispatch(menuToggle())}>
					<TiThMenu className='menuIcon' />
				</button>
			</section>
		</header>
	);
}
