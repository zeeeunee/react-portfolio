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
import { useEffect, useState } from 'react';
import * as types from './redux/actionType';
import { useSelector, useDispatch } from 'react-redux';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';
import Youtube from './components/sub/youtube/Youtube';
import Detail from './components/sub/youtube/Detail';

function App() {
	const dispatch = useDispatch();
	useSelector(store => console.log(store));

	useEffect(() => {
		dispatch({ type: types.MEMBERS.start });
		dispatch({ type: types.HISTORY.start });
		dispatch({ type: types.YOUTUBE.start });
		//순서1 flickr데이터 관련 action객체를 보낼때 fetch함수에 전달할 opt값을 action에 추가로 담아서 전달
		dispatch({ type: types.FLICKR.start, opt: { type: 'user', id: '199697926@N08' } });
	}, [dispatch]);

	const [Dark, setDark] = useState(false);
	const [Toggle, setToggle] = useState(false);

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
