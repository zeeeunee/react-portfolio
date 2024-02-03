import { useSelector } from 'react-redux';
import { useRef } from 'react';
import './Pics.scss';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Pics() {
	const num = useRef(5);
	const Pics = useSelector(store => store.flickr.data);
	return (
		<section className='Pics myScroll'>
			<h1>Best Image</h1>
			{Pics?.map((pic, idx) => {
				if (idx >= num.current) return null;
				return (
					<div key={pic.id}>
						<article>
							<Link to='/gallery'>
								<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
							</Link>
						</article>
						<h2>{pic.title}</h2>
					</div>
				);
			})}
		</section>
	);
}
