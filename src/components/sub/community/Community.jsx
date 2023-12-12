import Layout from '../../common/layout/Layout';
import './Community.scss';

export default function Community() {
	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<form>
						<h2>Create Post!</h2>
						<input type='text' placeholder='title' name='tit' />
						<textarea cols='70' rows='4' name='con' placeholder='content'></textarea>
						<nav className='btns'>
							<button className='canBtn'>CANCEL</button>
							<button className='postBtn'>POST</button>
						</nav>
					</form>
				</div>
				<div className='showBox'></div>
			</div>
		</Layout>
	);
}
