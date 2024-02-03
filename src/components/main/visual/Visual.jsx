import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import './Visual.scss';
import 'swiper/css';
import { useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Visual() {
	const num = useRef(5);
	const swipeRef = useRef(null);
	const [PrevIndex, setPrevIndex] = useState(0);
	const [Index, setIndex] = useState(0);
	const [NextIndex, setNextIndex] = useState(0);
	const Vids = useSelector(store => store.youtube.data);

	const swiperOpt = useRef({
		modules: [Autoplay],
		loop: true,
		slidesPerView: 1,
		spaceBetween: 50,
		centeredSlides: true,
		loopedSlides: num.current,
		onSwiper: swiper => (swipeRef.current = swiper),
		onSlideChange: swiper => {
			setIndex(swiper.realIndex);
			swiper.realIndex === 0 ? setPrevIndex(num.current - 1) : setPrevIndex(swiper.realIndex - 1);
			swiper.realIndex === num.current - 1 ? setNextIndex(0) : setNextIndex(swiper.realIndex + 1);
		},
		autoplay: { delay: 2000, disableOnInteraction: true },
		breakpoints: {
			1000: { slidesPerView: 2 },
			1400: { slidesPerView: 3 }
		}
	});

	return (
		<figure className='Visual myScroll'>
			<Swiper {...swiperOpt.current}>
				{Vids?.map((el, idx) => {
					if (idx >= num.current) return null;
					return (
						<SwiperSlide key={el.id}>
							<div className='pic'>
								<p>
									<Link to={`/detail/${el.id}`}>
										<img src={el.snippet.thumbnails.standard.url} alt={el.snippet.title} />
									</Link>
								</p>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
			<ul className='pagination'>
				{Array(num.current)
					.fill()
					.map((_, idx) => {
						return <li key={idx} className={idx === Index ? 'on' : ''} onClick={() => swipeRef.current.slideToLoop(idx, 400)}></li>;
					})}
			</ul>
			<nav className='preview'>
				<>
					<p className='prevBox'>
						<IoIosArrowBack onClick={() => swipeRef.current.slidePrev(400)} />
					</p>
					<p className='nextBox'>
						<IoIosArrowForward onClick={() => swipeRef.current.slideNext(400)} />
					</p>
				</>
			</nav>
		</figure>
	);
}
