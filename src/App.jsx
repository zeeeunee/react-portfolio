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

function App() {
	const dispatch = useDispatch();
	const Dark = useSelector(store => store.dark.isDark);

	useEffect(() => {
		dispatch(fetchYoutube());
		dispatch(fetchMember());
		dispatch(fetchHistory());
		dispatch(fetchFlickr({ type: 'interest' }));
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
			</div>
		</>
	);
}

export default App;
