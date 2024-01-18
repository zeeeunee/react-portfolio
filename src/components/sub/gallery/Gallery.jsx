import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useCustomText } from '../../../hooks/useText';
import Masonry from 'react-masonry-component';
import { IoSearch } from 'react-icons/io5';
import Modal from '../../common/modal/Modal';
import { IoArrowBackCircle } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { modalOpen } from '../../../redux/modalSlice';
import { fetchFlickr } from '../../../redux/flickrSlice';

export default function Gallery() {
	const dispatch = useDispatch();
	const Pics = useSelector(store => store.flickr.data);

	const myID = useRef('199821135@N02');
	const isUser = useRef(myID.current);
	const refNav = useRef(null);

	const searched = useRef(false);
	const shortenText = useCustomText('shorten');

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
		dispatch(fetchFlickr({ type: 'interest' }));
	};

	const handleMine = e => {
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		dispatch(fetchFlickr({ type: 'user', id: myID.current }));
	};

	const handleUser = e => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		dispatch(fetchFlickr({ type: 'user', id: e.target.innerText }));
	};

	const handleSearch = e => {
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const keyword = e.target.children[0].value;
		dispatch(fetchFlickr({ type: 'search', keyword: keyword }));
	};

	searched.current = true;

	const openModal = e => {
		setOpen(true);
	};

	useEffect(() => {
		dispatch(fetchFlickr({ type: 'user', id: '199821135@N02' }));
	}, [dispatch]);

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
												dispatch(modalOpen());
												setIndex(idx);
											}}>
											<p>View Detail</p>
											<IoArrowBackCircle />
										</span>
										<div className='profile'>
											<span onClick={handleUser}>{pic.owner}</span>
										</div>
										<h2>{shortenText(pic.title, 30)}</h2>
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
