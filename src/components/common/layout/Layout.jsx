import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useText';
import Anime from '../../../asset/anime';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Layout({ children, title }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splitText = useSplitText();
	const btnTop = useRef(null);

	const handleScroll = () => {
		const scroll = window.scrollY;
		scroll >= 200 ? btnTop.current?.classList.add('on') : btnTop.current?.classList.remove('on');
	};

	const throttledhandleScroll = useThrottle(handleScroll);

	useEffect(() => {
		window.addEventListener('scroll', throttledhandleScroll);
	}, [throttledhandleScroll]);

	useEffect(() => {
		splitText(refTitle.current, title, 0.7, 0.1);
		setTimeout(() => {
			refFrame.current?.classList.add('on');
		}, 300);
	}, [splitText, title]);

	return (
		<main ref={refFrame} className={`Layout ${title}`}>
			<h1 ref={refTitle}>{title}</h1>
			{children}
			<button
				ref={btnTop}
				className='btnTop'
				onClick={() => {
					new Anime(window, { scroll: 0 });
				}}>
				top
			</button>
		</main>
	);
}
