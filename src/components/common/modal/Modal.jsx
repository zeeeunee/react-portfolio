import { useGlobalData } from '../../../hooks/useGlobalData';
import './Modal.scss';

import { IoClose } from 'react-icons/io5';

export default function Modal({ children }) {
	const { ModalOpen, setModalOpen } = useGlobalData();
	return (
		<>
			{ModalOpen && (
				<aside className='Modal'>
					<div className='con'>{children}</div>
					<span onClick={() => setModalOpen(false)}>
						<IoClose />
					</span>
				</aside>
			)}
		</>
	);
}
