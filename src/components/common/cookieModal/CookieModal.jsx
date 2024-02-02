import { useRef, useState } from 'react';
import './CookieModal.scss';
import { useCookie } from '../../../hooks/useCookie';

export default function CookieModal({ children }) {
	const { isCookie, setCookie } = useCookie();

	const checkEl = useRef(null);

	const [Close, setClose] = useState(isCookie('today=done'));

	const handleClose = () => {
		const isChecked = checkEl.current.checked;

		if (isChecked) setCookie('today', 'done', 20);

		setClose(true);
	};

	return (
		<>
			{!Close && (
				<aside className='CookieModal'>
					<div className='content'>{children}</div>

					<div className='controls'>
						<nav>
							<input ref={checkEl} type='checkbox' />
							<span ref={checkEl}> Cookie Settings</span>
						</nav>

						<span className='closeButton' onClick={handleClose}>
							OK
						</span>
					</div>
				</aside>
			)}
		</>
	);
}
