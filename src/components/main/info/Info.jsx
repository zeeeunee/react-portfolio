import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useCustomText } from '../../../hooks/useText';
import './Info.scss';
import postData from './dummyPosts.json';
import { useState } from 'react';

export default function Info() {
	const changeText = useCustomText('combined');
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return postData.dummyPosts;
	};
	const [Post] = useState(getLocalData());
	console.log(Post);

	return (
		<section className='Info myScroll'>
			<div className='showBox'>
				<h2 className='post'>
					<Link to='/community'>P O S T</Link>
				</h2>
				{Post.map((el, idx) => {
					const date = JSON.stringify(el.date);
					const strDate = changeText(date.split('T')[0].slice(1), '.');
					if (idx >= 5) return null;
					return (
						<article key={el + idx}>
							<div className='txt'>
								<h2>{el.title}</h2>
								<p>{el.content}</p>
							</div>
							<span className='date'>{strDate}</span>
						</article>
					);
				})}
			</div>
		</section>
	);
}
