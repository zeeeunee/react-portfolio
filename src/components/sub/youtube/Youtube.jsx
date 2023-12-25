import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom';
import { IoMdArrowDroprightCircle } from 'react-icons/io';
import { useSelector } from 'react-redux';

export default function Youtube() {
	const Vids = useSelector(store => store.youtubeReducer.youtube);
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');

	return (
		<Layout title={'Youtube'}>
			<section className='YoutubeData'>
				<div className='topYoutube'>
					<div className='youtubeLeft'>
						<h3>Lorem, ipsum dolor.</h3>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus harum sunt iste doloribus similique quisquam? Saepe nemo tempore
							eveniet ducimus, deleniti excepturi ipsum iusto voluptas possimus perferendis ratione esse quos fugiat veritatis sunt asperiores
							provident sapiente illum. Distinctio itaque unde quasi vero numquam impedit, perferendis nulla praesentium officiis sit temporibus.
						</p>
					</div>
					<div className='youtubePic'>
						<img src='/img/youtube2.jpg' alt='diningroom' />
					</div>
				</div>
				<section className='our'>
					<h3>Our Youtube Post</h3>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, saepe.</p>
				</section>
				{Vids?.map(data => {
					const [date, time] = data.snippet.publishedAt.split('T');
					return (
						<article key={data.id}>
							<div className='left'>
								<div className='pic'>
									<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
								</div>
								<div className='detailButton'>
									<Link to={`/detail/${data.id}`}>
										<IoMdArrowDroprightCircle />
										View Detail
									</Link>
								</div>
								{/* <div className='infoBox'>
									<div className='date'>
										<span>{customText(date, '.')}</span>
										<em>{time.split('Z')[0]}</em>
									</div>
								</div> */}
							</div>
							<div className='txt'>
								<h2>{shortenText(data.snippet.title, 28)}</h2>
								<p>{shortenText(data.snippet.description, 250)}</p>
							</div>
						</article>
					);
				})}
			</section>
		</Layout>
	);
}
