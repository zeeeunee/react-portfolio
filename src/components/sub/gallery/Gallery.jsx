import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useCustomText } from '../../../hooks/useText';
import Masonry from 'react-masonry-component';
import { IoSearch } from 'react-icons/io5';
import Modal from '../../common/modal/Modal';

export default function Gallery() {
	const myID = useRef('199697926@N08');
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
		const flickr_api = '7973628e19035e31ccf3734cc641b14f';
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
				<section className='topTit'>
					<div className='leftTit'>
						<h3>
							<span>Let's connect</span>
							<span>your passion with</span>
							<span>our team</span>
						</h3>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatum aliquam dolores cumque, hic possimus ducimus commodi adipisci ipsa
							rerum ad animi consequatur eaque sequi praesentium porro nemo esse deserunt, modi sint iusto. Saepe enim quod rem omnis veritatis
							suscipit dolore sunt nihil beatae, magni quo hic cumque vel quas perferendis nulla officiis incidunt, dignissimos vitae aut libero at.
							Nemo vel unde amet dolor at ut labore incidunt eius sit voluptatum, porro, beatae perferendis iure ratione dolorum quis minus! Quasi
							distinctio delectus, numquam, exercitationem quaerat ab iste expedita commodi asperiores odio, totam illo doloremque amet molestiae
							nesciunt adipisci. Vel, fugiat at?
						</p>
					</div>
					<div className='rightTit'>
						<img src='/img/gallery.jpg' alt='sofa' />
					</div>
				</section>
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
										<div
											className='pic'
											onClick={() => {
												setOpen(true);
												setIndex(idx);
											}}>
											<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
										</div>
										<div className='profile'>
											<img
												src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
												alt='사용자프로필이미지'
												onError={e => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
											/>

											<span onClick={handleUser}>{pic.owner}</span>
										</div>
										{/* <h2>{shortenText(pic.title, 20)}</h2> */}
									</article>
								);
							})}
					</Masonry>
				</section>
			</Layout>

			<Modal Open={Open} setOpen={setOpen}>
				{Pics.length !== 0 && (
					<img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
				)}
			</Modal>
		</>
	);
}
