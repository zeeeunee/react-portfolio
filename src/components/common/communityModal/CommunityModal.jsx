import './CommunityModal.scss';
import { AiOutlineClose } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

export default function CommunityModal({ Open, setOpen }) {
	return (
		<>
			{Open && (
				<aside className='CommunityModal'>
					<div className='wrap'>
						<div className='inputBox'>
							<form>
								<input type='text' placeholder='title' name='tit' />
								<textarea cols='30' rows='3' name='con' placeholder='content'></textarea>
								<nav>
									<button>
										<AiOutlineClose />
									</button>
									<button>
										<FaCheck />
									</button>
								</nav>
							</form>
						</div>
						<div className='showBox'></div>
					</div>
					<span onClick={() => setOpen(false)}>
						<IoClose />
					</span>
				</aside>
			)}
		</>
	);
}
