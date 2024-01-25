import Banner from '../banner/Banner';
import Btns from '../btns/Btns';
import Info from '../info/Info';
import Pics from '../pics/Pics';
import Illust from '../illust/Illust';
import Visual from '../visual/Visual';
import './MainWrap.scss';

export default function MainWrap() {
	return (
		<div className='MainWrap'>
			<Visual />
			<Pics />
			<Illust />
			<Banner />
			<Info />
			<Btns />
		</div>
	);
}
