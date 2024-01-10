import { useEffect, useRef } from 'react';
import './Layout.scss';
import { useSplitText } from '../../../hooks/useSplitText';
import Anime from '../../../asset/anime';

export default function Layout({ children, title }) {
	const refFrame = useRef(null);
	const refTitle = useRef(null);
	const splitText = useSplitText();
	const btnTop = useRef(null);

	const handleScroll = () => {
		const scroll = window.scrollY;
		scroll >= 200 ? btnTop.current.classList.add('on') : btnTop.current.classList.remove('on');
	};
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
	}, []);
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
