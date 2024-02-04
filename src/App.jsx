import Footer from './components/common/footer/Footer';
import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import { Route } from 'react-router-dom';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { useEffect } from 'react';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import Youtube from './components/sub/youtube/Youtube';
import Detail from './components/sub/youtube/Detail';
import { useDispatch, useSelector } from 'react-redux';
import { fetchYoutube } from './redux/youtubeSlice';
import { fetchMember } from './redux/memberSlice';
import { fetchHistory } from './redux/historySlice';
import { fetchFlickr } from './redux/flickrSlice';
import { fetchBanner } from './redux/bannerSlice';
import { useCookie } from './hooks/useCookie';
import CookieModal from './components/common/cookieModal/CookieModal';

function App() {
	const dispatch = useDispatch();
	const Dark = useSelector(store => store.dark.isDark);
	useCookie('today', 'done', 20);

	useEffect(() => {
		dispatch(fetchYoutube());
		dispatch(fetchMember());
		dispatch(fetchHistory());
		dispatch(fetchBanner());
		dispatch(fetchFlickr({ type: 'user', id: '199821135@N02' }));
	}, [dispatch]);

	return (
		<>
			<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
				<Header />
				<Route exact path='/' component={MainWrap} />
				<Route path='/department' component={Department} />
				<Route path='/youtube' component={Youtube} />
				<Route path='/detail/:id' component={Detail} />
				<Route path='/gallery' component={Gallery} />
				<Route path='/community' component={Community} />
				<Route path='/members' component={Members} />
				<Route path='/contact' component={Contact} />
				<Footer />
				<Menu />
				<CookieModal>
					<h1>ZEEEUNEE uses cookies</h1>
					<p>
						We use cookies and similar technologies to enhance site navigation, analyze site usage, assist with our marketing efforts and enable you
						to share content on social networks. By continuing to use this website, you agree to these Terms of Use.
					</p>
				</CookieModal>
			</div>
		</>
	);
}

export default App;
