import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import './Visual.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useCustomText } from '../../../hooks/useText';
import { GiPauseButton } from 'react-icons/gi';
import { FaPlay } from 'react-icons/fa6';

function Btns() {
	const swiper = useSwiper();

	useEffect(() => {
		swiper.slideNext(300);
	}, [swiper]);

	return (
		<nav className='swiperController'>
			<button
				onClick={() => {
					swiper.slideNext(300);
					swiper.autoplay.start();
				}}>
				<FaPlay />
			</button>
			<button onClick={() => swiper.autoplay.stop()}>
				<GiPauseButton />
			</button>
		</nav>
	);
}

export default function Visual() {
	const { data: youtube, isSuccess } = useYoutubeQuery();
	const shortenText = useCustomText('shorten');
	return (
		<figure className='Visual'>
			<Swiper
				modules={[Pagination, Autoplay]}
				pagination={{
					clickable: true,
					renderBullet: (index, className) => {
						return `<span class=${className}>${index + 1}</span>`;
					}
				}}
				autoplay={{
					delay: 2000,
					disableOnInteraction: true
				}}
				loop={true}>
				{isSuccess &&
					youtube.map((vid, idx) => {
						if (idx >= 5) return null;
						return (
							<SwiperSlide key={vid.id}>
								<div className='inner'>
									<div className='picBox'>
										<p>
											<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
										</p>
										<p>
											<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
										</p>
									</div>
									<div className='txtBox'>
										<h2>{shortenText(vid.snippet.title, 40)}</h2>
										<Link to={`/detail/${vid.id}`}>View Detail</Link>
									</div>
								</div>
							</SwiperSlide>
						);
					})}
				<Btns />
			</Swiper>
		</figure>
	);
}
