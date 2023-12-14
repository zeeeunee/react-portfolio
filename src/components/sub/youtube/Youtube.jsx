import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useState, useEffect } from 'react';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom';

export default function Youtube() {
	const [Vids, setVids] = useState([]);
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');

	const fetchYoutube = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pid = process.env.REACT_APP_YOUTUBE_LIST;
		const num = 6;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			setVids(json.items);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<Layout title={'Youtube'}>
			<div className='singleVideo'>
				<iframe
					width='560'
					height='315'
					src='https://www.youtube.com/embed/xXWUgGLByIw?si=CVoxHAJY2yeJo4Zd&amp;controls=0'
					title='YouTube video player'
					frameborder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					allowfullscreen></iframe>
			</div>

			<section className='YoutubeData'>
				<section className='our'>
					<h3>Our Youtube Post</h3>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, saepe.</p>
				</section>

				{Vids.map(data => {
					const [date, time] = data.snippet.publishedAt.split('T');

					return (
						<article key={data.id}>
							<div className='pic'>
								<Link to={`/detail/${data.id}`}>
									<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
								</Link>
							</div>
							<div className='infoBox'>
								<span>{customText(date, '.')}</span>
								<em>{time.split('Z')[0]}</em>
							</div>

							<div className='txt'>
								<h2>{shortenText(data.snippet.title, 40)}</h2>
								<p>{shortenText(data.snippet.description, 140)}</p>
							</div>
						</article>
					);
				})}
			</section>
		</Layout>
	);
}
