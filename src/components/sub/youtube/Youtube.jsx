import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useState, useEffect } from 'react';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Youtube() {
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');
	const [Vids, setVids] = useState([]);

	const fetchYoutube = async () => {
		const api_key = 'AIzaSyBQ0OBVJR5LwVP7O1wFRSbfMbLCLvWRLnE';
		const pid = 'PLM7Wu-2kzIQPISbXB5yK53ANqLA6I1IZs';
		const num = 6;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			setVids(json.items);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<Layout title={'Youtube'}>
			<section className='YoutubeData'>
				<div className='topPic'>
					<img src='/img/image.jpg' alt='house' />
				</div>
				<div className='our'>
					<h3>Our Youtube Post</h3>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, saepe.</p>
				</div>

				{Vids.map((data, idx) => {
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
