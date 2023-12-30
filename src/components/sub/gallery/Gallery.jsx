import { useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Gallery.scss';
import { useCustomText } from '../../../hooks/useText';
import Masonry from 'react-masonry-component';
import { IoSearch } from 'react-icons/io5';
import Modal from '../../common/modal/Modal';
import { useFlickrQuery } from '../../../hooks/useFlickrQuery';
import { useGlobalData } from '../../../hooks/useGlobalData';
import { IoArrowBackCircle } from 'react-icons/io5';

export default function Gallery() {
	const myID = useRef('199697926@N08');
	const isUser = useRef(myID.current);
	const refNav = useRef(null);
	const searched = useRef(false);
	const shortenText = useCustomText('shorten');

	const [Opt, setOpt] = useState({ type: 'user', id: myID.current });

	const [Index, setIndex] = useState(0);

	const { data: Pics, isSuccess } = useFlickrQuery(Opt);

	const { setModalOpen } = useGlobalData();

	const activateBtn = e => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach(btn => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};
	const handleInterest = e => {
		if (e.target.classList.contains('on')) return;
		isUser.current = '';
		activateBtn(e);
		setOpt({ type: 'interest' });
	};

	const handleMine = e => {
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		setOpt({ type: 'user', id: myID.current });
	};

	const handleUser = e => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		setOpt({ type: 'user', id: e.target.innerText });
	};

	const handleSearch = e => {
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const keyword = e.target.children[0].value;
		setOpt({ type: 'search', keyword: keyword });
	};

	searched.current = true;

	const openModal = e => {
		setModalOpen(true);
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
						{isSuccess && searched.current && Pics.length === 0 ? (
							<h2>해당 키워드에 대한 검색 결과가 없습니다.</h2>
						) : (
							isSuccess &&
							Pics &&
							Pics.map((pic, idx) => {
								return (
									<article key={pic.id}>
										<div
											className='pic'
											onClick={() => {
												setModalOpen(true);
												setIndex(idx);
											}}>
											<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
										</div>
										<span
											onClick={() => {
												setModalOpen(true);
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
							})
						)}
					</Masonry>
				</section>
			</Layout>

			<Modal>
				{isSuccess && Pics.length !== 0 && (
					<img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
				)}
			</Modal>
		</>
	);
}
