import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useState, useEffect } from 'react';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { useSelector } from 'react-redux';

export default function Youtube() {
	const Vids = useSelector(store => store.youtubeReducer.youtube);

	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');

	return (
		<Layout title={'Youtube'}>
			<section className='YoutubeData'>
				<div className='topPic'>
					<img src='/img/image.jpg' alt='sofa' />
				</div>
				<section className='our'>
					<h3>Our Youtube Post</h3>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, saepe.</p>
				</section>

				{Vids?.map(data => {
					const [date, time] = data.snippet.publishedAt.split('T');

					return (
						<article key={data.id}>
							<div className='pic'>
								<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
							</div>
							<div className='infoBox'>
								<div className='viewDetail'>
									<FaArrowRight />
									<Link to={`/detail/${data.id}`}>view detail</Link>
								</div>
								<div className='date'>
									<span>{customText(date, '.')}</span>
									<em>{time.split('Z')[0]}</em>
								</div>
							</div>

							<div className='txt'>
								<h2>{shortenText(data.snippet.title, 40)}</h2>
								<p>{shortenText(data.snippet.description, 250)}</p>
							</div>
						</article>
					);
				})}
			</section>
		</Layout>
	);
}
