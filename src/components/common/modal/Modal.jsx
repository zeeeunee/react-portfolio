import './Modal.scss';
import { IoClose } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../redux/actionType';

export default function Modal({ children }) {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.modalReducer.modal);

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
