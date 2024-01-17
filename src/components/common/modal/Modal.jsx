import { IoClose } from 'react-icons/io5';
import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { modalClose } from '../../../redux/modalSlice';

export default function Modal({ children }) {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.modal.open);
	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='Modal'
					initial={{ opacity: 0, x: '-100%', scale: 0, rotate: 0 }}
					animate={{ opacity: 1, x: '0%', scale: 1, rotate: 0 }}
					exit={{ opacity: 0, y: '100%', scale: 2, rotate: 0, transition: { delay: 0.5 } }}
					transition={{ duration: 1 }}>
					<div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { delay: 0 } }}
						transition={{ duration: 0.5, delay: 1 }}>
						{children}
					</div>
					<span onClick={() => dispatch(modalClose())}>
						<IoClose />
					</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
