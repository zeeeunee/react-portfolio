import './Modal.scss';

import { IoClose } from 'react-icons/io5';

export default function Modal({ Open, setOpen, children }) {
	return (
		<>
			{Open && (
				<aside className='Modal'>
					<div className='con'>{children}</div>
					<span onClick={() => setOpen(false)}>
						<IoClose />
					</span>
				</aside>
			)}
		</>
	);
}
