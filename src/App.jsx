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

function App() {
	const dispatch = useDispatch();
	const path = useRef(process.env.PUBLIC_URL);

	const [Dark, setDark] = useState(false);
	const [Toggle, setToggle] = useState(false);

	const fetchDepartment = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		dispatch({ type: 'SET_MEMBERS', payload: json.members });
	}, [dispatch]);

	const fetchHistory = useCallback(async () => {
		const data = await fetch(`${path.current}/DB/history.json`);
		const json = await data.json();
		dispatch({ type: 'SET_HISTORY', payload: json.history });
	}, [dispatch]);

	const fetchYoutube = useCallback(async () => {
		const api_key = 'AIzaSyBQ0OBVJR5LwVP7O1wFRSbfMbLCLvWRLnE';
		const pid = 'PLM7Wu-2kzIQNrTEyi14QDMjdugAx8sKNZ';
		const num = 6;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			dispatch({ type: 'SET_YOUTUBE', payload: json.items });
		} catch (err) {
			dispatch({ type: 'SET_YOUTUBE_ERR', payload: err });
		}
	}, [dispatch]);

	useEffect(() => {
		fetchDepartment();
		fetchHistory();
		fetchYoutube();
	}, [fetchDepartment, fetchHistory, fetchYoutube]);

	return (
		<>
			<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
				<Header Dark={Dark} setDark={setDark} Toggle={Toggle} setToggle={setToggle} />
				<Route exact path='/' component={MainWrap} />
				<Route path='/department' component={Department} />
				<Route path='/youtube' component={Youtube} />
				<Route path='/detail/:id' component={Detail} />
				<Route path='/gallery' component={Gallery} />
				<Route path='/community' component={Community} />
				<Route path='/members' component={Members} />
				<Route path='/contact' component={Contact} />
				<Footer />
				{Toggle && <Menu setToggle={setToggle} />}
			</div>
		</>
	);
}

export default App;
