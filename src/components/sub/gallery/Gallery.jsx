import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useCustomText } from '../../../hooks/useText';
import Masonry from 'react-masonry-component';
import { IoSearch } from 'react-icons/io5';
import Modal from '../../common/modal/Modal';
import { useDispatch } from 'react-redux';
import * as types from '../../../redux/action';
import { IoArrowBackCircle } from 'react-icons/io5';

export default function Gallery() {
	const dispatch = useDispatch();
	const myID = useRef('199821135@N02');
	const isUser = useRef(myID.current);
	const refNav = useRef(null);
	const searched = useRef(false);
	const shortenText = useCustomText('shorten');

	const [Pics, setPics] = useState([]);
	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);

	const activateBtn = e => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach(btn => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};
	const handleInterest = e => {
		if (e.target.classList.contains('on')) return;
		isUser.current = '';
		activateBtn(e);
		fetchFlickr({ type: 'interest' });
	};

	const handleMine = e => {
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		fetchFlickr({ type: 'user', id: myID.current });
	};

	const handleUser = e => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		fetchFlickr({ type: 'user', id: e.target.innerText });
	};

	const handleSearch = e => {
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const keyword = e.target.children[0].value;
		fetchFlickr({ type: 'search', keyword: keyword });
	};

	searched.current = true;

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

	const openModal = e => {
		setOpen(true);
	};

	useEffect(() => {
		fetchFlickr({ type: 'user', id: myID.current });
	}, []);

	return (
		<>
			<Layout title={'Gallery'}>
				<section className='topPic'>
					<img src='/img/sofa.jpg' alt='sofa' />
				</section>
				<div className='peace'>
					<h3>Peace be with you</h3>
					<div className='peaceP'>
						<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt, quidem.</p>
						<p>Lorem ipsum dolor sit amet consectetur.</p>
					</div>
				</div>
				<article className='controls'>
					<nav className='btnSet' ref={refNav}>
						<button onClick={handleInterest}>Interest Gallery</button>
						<button className='on' onClick={handleMine}>
							My Gallery
						</button>
					</nav>
					<form onSubmit={handleSearch}>
						<input type='text' placeholder='Search' />
						<IoSearch className='btnSearch' />
					</form>
				</article>
				<section>
					<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: 20 }}>
						{Pics &&
							Pics.map((pic, idx) => {
								return (
									<article key={pic.id}>
										<div className='pic'>
											<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
										</div>
										<span
											onClick={() => {
												dispatch({ type: types.MODAL.start, payload: true });
												setIndex(idx);
											}}>
											<p>View Detail</p>
											<IoArrowBackCircle />
										</span>

										<div className='profile'>
											{/* <img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt='사용자프로필이미지'
												onError={e => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
											/> */}

											<span onClick={handleUser}>{pic.owner}</span>
										</div>
										<h2>{shortenText(pic.title, 30)}</h2>
									</article>
								);
							})}
					</Masonry>
				</section>
			</Layout>

			<Modal>
				{Pics.length !== 0 && (
					<img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
				)}
			</Modal>
		</>
	);
}
