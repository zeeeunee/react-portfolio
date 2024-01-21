import { useRef, useState } from 'react';
import { useFlickrQuery } from '../../../hooks/useFlickrQuery';
import './Pics.scss';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function Pics() {
	const myID = useRef('199821135@N02');
	const num = useRef(5);
	const [Opt, setOpt] = useState({ type: 'user', id: myID.current });
	const { data: Pics, isSuccess } = useFlickrQuery(Opt);
	return (
		<section className='Pics myScroll'>
			<h1>Best Image</h1>
			{isSuccess &&
				Pics.map((pic, idx) => {
					if (idx >= num.current) return null;
					return (
						<div>
							<article>
								<Link to='/gallery'>
									{' '}
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
