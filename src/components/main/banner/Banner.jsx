import { useRef, useState } from 'react';
import { useBannerQuery } from '../../../hooks/useBannerQuery';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import './Banner.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaPlay, FaPause } from 'react-icons/fa6';

function Btns() {
	const swiper = useSwiper();
	return (
		<nav className='swiperController'>
			<button onClick={() => swiper.autoplay.start()}>
				<FaPlay />
			</button>
			<button onClick={() => swiper.autoplay.stop()}>
				<FaPause />
			</button>
		</nav>
	);
}

export default function Banner() {
	const path = process.env.PUBLIC_URL;
	const num = useRef(5);
	const swipeRef = useRef(null);
	const [Index, setIndex] = useState(0);
	const [PrevIndex, setPrevIndex] = useState(0);
	const [NextIndex, setNextIndex] = useState(0);
	const { data, isSuccess } = useBannerQuery();

	const swiperOpt = useRef({
		modules: [Autoplay],
		loop: true,
		slidesPerView: 1,
		centeredSlides: true,
		loopedSlides: num.current,
		onSwiper: swiper => (swipeRef.current = swiper),
		onSlideChange: swiper => {
			setIndex(swiper.realIndex);
			swiper.realIndex === 0 ? setPrevIndex(num.current - 1) : setPrevIndex(swiper.realIndex - 1);
			swiper.realIndex === num.current - 1 ? setNextIndex(0) : setNextIndex(swiper.realIndex + 1);
		},
		autoplay: { delay: 2000, disableOnInteraction: true }
	});

	return (
		<section className='Banner myScroll'>
			<Swiper {...swiperOpt.current}>
				{isSuccess &&
					data.map((banner, idx) => {
						if (idx >= num.current) return null;
						return (
							<SwiperSlide key={banner + idx}>
								<div className='box'></div>
								<article className='picture'>
									<img key={banner + idx} src={`${path}/img/${banner.pic}`} alt='diningroom' />
								</article>
							</SwiperSlide>
						);
					})}
				<Btns />
			</Swiper>
			<nav className='arrow'>
				{isSuccess && (
					<>
						<p className='prevArrow'>
							<IoIosArrowBack onClick={() => swipeRef.current.slidePrev(400)} />
						</p>
						<p className='nextArrow'>
							<IoIosArrowForward onClick={() => swipeRef.current.slideNext(400)} />
						</p>
					</>
				)}
			</nav>
			<div className='counter'>
				<span>{Index + 1}</span> / <span>{num.current}</span>
			</div>
		</section>
	);
}
