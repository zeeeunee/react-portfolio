import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useCustomText } from '../../../hooks/useText';

export default function Gallery() {
	const [Pics, setPics] = useState([]);
	const shortenText = useCustomText('shorten');

	const fetchFlickr = async () => {
		const num = 100;
		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const method_interest = 'flickr.interestingness.getList';
		const baseURL = 'https://www.flickr.com/services/rest/?method=';
		const resultURL = `${baseURL}${method_interest}&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1`;

		const data = await fetch(resultURL);
		const json = await data.json();

		setPics(json.photos.photo);
	};

	useEffect(() => {
		fetchFlickr();
	}, []);

	return (
		<Layout title={'Gallery'}>
			<section className='frame'>
				{Pics.map((pic, idx) => {
					return (
						<article key={pic.id}>
							<div className='profile'>
								<img
									src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
									alt='사용자프로필이미지'
									onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
								/>
								<span>{pic.owner}</span>
							</div>

							<div className='pic'>
								<img
									src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
									alt={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_b.jpg`}
								/>
							</div>

							<h2>{shortenText(pic.title, 30)}</h2>
						</article>
					);
				})}
			</section>
		</Layout>
	);
}
