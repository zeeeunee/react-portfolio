import './Modal.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../redux/action';
import { IoClose } from 'react-icons/io5';

export default function Modal({ children }) {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.modalReducer.modal);
	console.log(Open);
	return (
		<>
			{Open && (
				<aside className='Modal'>
					<div className='con'>{children}</div>
					<span onClick={() => dispatch({ type: types.MODAL.start, payload: false })}>
						<IoClose />
					</span>
				</aside>
			)}
		</>
	);
}
