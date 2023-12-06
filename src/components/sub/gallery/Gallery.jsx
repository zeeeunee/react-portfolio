import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useCustomText } from '../../../hooks/useText';
import Masonry from 'react-masonry-component';

export default function Gallery() {
	const shortenText = useCustomText('shorten');
	const [Pics, setPics] = useState([]);
	const myID = useRef('199697926@N08');
	const fetchFlickr = async (opt) => {
		const num = 100;
		const flickr_api = process.env.REACT_APP_FLICKR_API;
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const interestURL = `${baseURL}${method_interest}`;

		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
		let url = '';

		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);
		const data = await fetch(url);
		const json = await data.json();
		setPics(json.photos.photo);
	};

	useEffect(() => {
		fetchFlickr({ type: 'user', id: myID.current });
	}, []);

	return (
		<Layout title={'Gallery'}>
			<article className='controls'>
				<nav className='btnSet'>
					<button onClick={() => fetchFlickr({ type: 'interest' })}>Interest Gallery</button>
					<button className='on' onClick={() => fetchFlickr({ type: 'user', id: myID.current })}>
						My Gallery
					</button>
				</nav>
			</article>
			<section>
				<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: 20 }}>
					{Pics.map((pic, idx) => {
						return (
							<article key={pic.id}>
								<div className='profile'>
									<img
										src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
										alt='사용자프로필이미지'
										onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
									/>
									<span onClick={() => fetchFlickr({ type: 'user', id: pic.owner })}>{pic.owner}</span>
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
				</Masonry>
			</section>
		</Layout>
	);
}
