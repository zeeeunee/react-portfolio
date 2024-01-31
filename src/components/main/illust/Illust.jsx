import { useEffect, useRef } from 'react';
import './Illust.scss';

export default function SvgMotion() {
	const pathEl = useRef(null);
	const refEl = useRef(null);

	const handleCustomScroll = () => {
		const pathLen = 3824;
		pathEl.current.style.strokeDashoffset = pathLen;

		const scroll = window.scrollY;

		//섹션기준점에 도달하기 전까지는 기존 값 고수
		if (scroll < 0) {
			pathEl.current.style.strokeDashoffset = pathLen;
		}
		//섹션에 도달하는 순간부터 스크롤값 연동
		if (scroll >= 0) {
			let resultScroll = 0;
			pathLen - scroll * 3 < 0 ? (resultScroll = 0) : (resultScroll = pathLen - scroll * 3);
			pathEl.current.style.strokeDashoffset = resultScroll;
		}
		//섹션을 벗어나는 순간부터는 0값을 고수
		if (scroll >= scroll + pathEl.current.offsetHeight) {
			pathEl.current.style.strokeDashoffset = 0;
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', handleCustomScroll);
		return () => window.removeEventListener('scroll', handleCustomScroll);
	}, []);

	return (
		<div className='Illust myScroll' ref={pathEl}>
			<div className='svgCouch'>
				<svg viewBox='-5 0 647 514'>
					<path
						ref={pathEl}
						d='M64 160C64 89.3 121.3 32 192 32H448c70.7 0 128 57.3 128 128v33.6c-36.5 7.4-64 39.7-64 78.4v48H128V272c0-38.7-27.5-71-64-78.4V160zM544 272c0-20.9 13.4-38.7 32-45.3c5-1.8 10.4-2.7 16-2.7c26.5 0 48 21.5 48 48V448c0 17.7-14.3 32-32 32H576c-17.7 0-32-14.3-32-32H96c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V272c0-26.5 21.5-48 48-48c5.6 0 11 1 16 2.7c18.6 6.6 32 24.4 32 45.3v48 32h32H512h32V320 272z'
					/>
				</svg>
			</div>
		</div>
	);
}
