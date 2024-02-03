import Pics from '../pics/Pics';
import Visual from '../visual/Visual';
import Btns from '../btns/Btns';
import './MainWrap.scss';
import Banner from '../banner/Banner';

export default function MainWrap() {
	return (
		<div className='MainWrap'>
			<Btns />
			<Visual />
			<Pics />
			<Banner />
		</div>
	);
}
