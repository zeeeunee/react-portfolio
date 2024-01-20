import { useRef, useState } from 'react';
import { useBannerQuery } from '../../../hooks/useBanner';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Banner.scss';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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
								<article className='picture'>
									<img key={banner + idx} src={`${path}/img/${banner.pic}`} alt='diningroom' />
								</article>
							</SwiperSlide>
						);
					})}
			</Swiper>
			<nav className='allow'>
				{isSuccess && (
					<>
						<p className='prevAllow'>
							<IoIosArrowBack onClick={() => swipeRef.current.slidePrev(400)} />
						</p>
						<p className='nextAllow'>
							<IoIosArrowForward onClick={() => swipeRef.current.slideNext(400)} />
						</p>
					</>
				)}
			</nav>
		</section>
	);
}
