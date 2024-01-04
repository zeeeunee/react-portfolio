import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';
import './Visual.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useCustomText } from '../../../hooks/useText';
import { useRef } from 'react';

export default function Visual() {
	const { data: youtube, isSuccess } = useYoutubeQuery();
	const swiperOpt = useRef({
		loop: true,
		slidesPerView: 1,
		spaceBetween: 0,
		centeredSlides: true,
		onSwiper: swiper => {
			swiper.slideNext(300);
		},
		breakpoints: {
			1000: {
				slidesPerView: 2,
				spaceBetween: 50
			},
			1400: {
				slidesPerView: 3,
				spaceBetween: 50
			}
		}
	});

	const shortenText = useCustomText('shorten');
	return (
		<figure className='Visual'>
			<Swiper {...swiperOpt.current}>
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
			</Swiper>
		</figure>
	);
}
