import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom';
import { IoMdArrowDroprightCircle } from 'react-icons/io';
import { useSelector } from 'react-redux';

export default function Youtube() {
	const Vids = useSelector(store => store.youtube.data);
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');

	return (
		<Layout title={'Youtube'}>
			<section className='YoutubeData'>
				<div className='topYoutube'>
					<div className='youtubeLeft'>
						<h3>Lorem, ipsum dolor.</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam voluptatum ipsum aut ullam veniam aperiam maxime nihil, placeat fugit eius
							corrupti ex ut temporibus assumenda quasi exercitationem maiores iste laborum tenetur ad expedita deserunt sunt neque eos. Sunt placeat,
							unde reprehenderit, laboriosam consequuntur impedit eum esse id obcaecati animi fuga.
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
