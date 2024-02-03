import Pics from '../pics/Pics';
import Visual from '../visual/Visual';
import Btns from '../btns/Btns';
import './MainWrap.scss';

export default function MainWrap() {
	return (
		<div className='MainWrap'>
			<Btns />
			<Visual />
			<Pics />
		</div>
	);
}
