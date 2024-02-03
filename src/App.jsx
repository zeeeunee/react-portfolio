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
import { useState, useEffect, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import Youtube from './components/sub/youtube/Youtube';
import Detail from './components/sub/youtube/Detail';
import * as types from './redux/action';

function App() {
	const dispatch = useDispatch();
	const path = useRef(process.env.PUBLIC_URL);

	const [Dark, setDark] = useState(false);

	const fetchDepartment = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		dispatch({ type: types.MEMBER.success, payload: json.members });
	}, [dispatch]);

	const fetchHistory = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/history.json`);
		const json = await data.json();
		dispatch({ type: types.HISTORY.success, payload: json.history });
	}, [dispatch]);

	const fetchBanner = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/banner.json`);
		const json = await data.json();
		dispatch({ type: types.BANNER.success, payload: json.banner });
	}, [dispatch]);

	const fetchYoutube = useCallback(async () => {
		const api_key = 'AIzaSyBQ0OBVJR5LwVP7O1wFRSbfMbLCLvWRLnE';
		const pid = 'PLM7Wu-2kzIQPISbXB5yK53ANqLA6I1IZs';
		const num = 9;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			dispatch({ type: types.YOUTUBE.success, payload: json.items });
		} catch (err) {
			dispatch({ type: types.YOUTUBE.fail, payload: err });
		}
	}, [dispatch]);

	useEffect(() => {
		fetchDepartment();
		fetchHistory();
		fetchYoutube();
		fetchBanner();
	}, [fetchDepartment, fetchHistory, fetchYoutube, fetchBanner]);

	return (
		<>
			<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
				<Header Dark={Dark} setDark={setDark} />
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
