import Anime from '../../../asset/anime';
import { useEffect, useRef, useState } from 'react';
import './Btns.scss';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Btns() {
	const [Num, setNum] = useState(0);
	const secs = useRef(null);
	const wrap = useRef(null);
	const btns = useRef(null);
	const baseLine = useRef(-window.innerHeight / 2);

	const activation = () => {
		console.log(activation);
		const scroll = wrap.current.scrollTop;
		secs.current.forEach((sec, idx) => {
			if (scroll >= secs.current[idx].offsetTop + baseLine.current) {
				Array.from(btns.current.children).forEach(btn => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});
	};

	const moveScroll = idx => {
		new Anime(wrap.current, { scroll: secs.current[idx].offsetTop }, { duration: 500 });
	};

	const throttledActivation = useThrottle(activation);

	useEffect(() => {
		wrap.current = document.querySelector('.wrap');
		secs.current = wrap.current.querySelectorAll('.myScroll');
		setNum(secs.current.length);

		wrap.current.addEventListener('scroll', throttledActivation);
		return () => wrap.current.removeEventListener('scroll', throttledActivation);
	}, [throttledActivation]);
	return (
		<ul className='Btns' ref={btns}>
			{Array(Num)
				.fill()
				.map((_, idx) => {
					return (
						<li
							key={idx}
							className={idx === 0 ? 'on' : ''}
							onClick={() => {
								moveScroll(idx);
							}}></li>
					);
				})}
		</ul>
	);
}
