import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import { TiThMenu } from 'react-icons/ti';

export default function Header({ Toggle, setToggle, Dark, setDark }) {
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
				<button className='menuToggle' onClick={() => setToggle(!Toggle)}>
					<TiThMenu className='menuIcon' />
				</button>
			</div>
		</header>
	);
}
