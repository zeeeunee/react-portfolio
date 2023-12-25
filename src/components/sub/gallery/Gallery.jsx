import { useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useCustomText } from '../../../hooks/useText';
import Masonry from 'react-masonry-component';
import { IoSearch } from 'react-icons/io5';
import Modal from '../../common/modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../redux/actionType';
import { IoArrowBackCircle } from 'react-icons/io5';

export default function Gallery() {
	const dispatch = useDispatch();
	const Pics = useSelector(store => store.flickrReducer.flickr);
	const myID = useRef('199697926@N08');
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
		dispatch({ type: types.FLICKR.start, opt: { type: 'interest' } });
	};

	const handleMine = e => {
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		dispatch({ type: types.FLICKR.start, opt: { type: 'user', id: myID.current } });
	};

	const handleUser = e => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		dispatch({ type: types.FLICKR.start, opt: { type: 'user', id: e.target.innerText } });
	};

	const handleSearch = e => {
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const keyword = e.target.children[0].value;
		dispatch({ type: types.FLICKR.start, opt: { type: 'search', keyword: keyword } });
	};

	searched.current = true;

	const openModal = e => {
		setOpen(true);
	};

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
						{Pics.map((pic, idx) => {
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

										<span onClick={handleUser}>User {pic.owner}</span>
									</div>
									<h2>{shortenText(pic.title, 30)}</h2>
								</article>
							);
						})}
					</Masonry>
				</section>
			</Layout>

			<Modal>
				{Pics?.length !== 0 && (
					<img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
				)}
			</Modal>
		</>
	);
}
