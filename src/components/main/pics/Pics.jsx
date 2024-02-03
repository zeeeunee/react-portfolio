import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './Pics.scss';

export default function Pics() {
	const myID = useRef('199821135@N02');
	const num = useRef(5);
	const [Pics, setPics] = useState([]);

	const fetchFlickr = async opt => {
		const num = 100;
		const flickr_api = '9a541cffc249a97f16605be38396de1c';
		const baseURL = `https://www.flickr.com/services/rest/?&api_key=${flickr_api}&per_page=${num}&format=json&nojsoncallback=1&method=`;
		const method_interest = 'flickr.interestingness.getList';
		const method_user = 'flickr.people.getPhotos';
		const method_search = 'flickr.photos.search';

		const interestURL = `${baseURL}${method_interest}`;
		const userURL = `${baseURL}${method_user}&user_id=${opt.id}`;
		let url = '';
		const searchURL = `${baseURL}${method_search}&tags=${opt.keyword}`;

		opt.type === 'user' && (url = userURL);
		opt.type === 'interest' && (url = interestURL);
		opt.type === 'search' && (url = searchURL);

		const data = await fetch(url);
		const json = await data.json();

		setPics(json.photos.photo);
	};

	useEffect(() => {
		fetchFlickr({ type: 'user', id: myID.current });
	}, []);

	return (
		<section className='Pics myScroll'>
			<h1>Best Image</h1>

			{Pics &&
				Pics.map((pic, idx) => {
					if (idx >= num.current) return null;
					return (
						<div>
							<article>
								<Link to='/gallery'>
									<img key={pic.id} src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
								</Link>
							</article>
							<h2>{pic.title}</h2>
						</div>
					);
				})}
		</section>
	);
}
