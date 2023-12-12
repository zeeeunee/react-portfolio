import Layout from '../../common/layout/Layout';
import './Community.scss';
import { useRef, useState } from 'react';

export default function Community() {
	const [Post, setPost] = useState([]);
	const refTit = useRef(null);
	const refCon = useRef(null);

	const resetPost = () => {
		refTit.current.value = '';
		refCon.current.value = '';
	};
	const createPost = () => {
		setPost([{ title: refTit.current.value, content: refCon.current.value }, ...Post]);
	};
	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<div className='pic'>
						<img src='/img/post.jpg' alt='post' />
					</div>
					<form>
						<h2>Create Post!</h2>
						<input type='text' placeholder='title' name='tit' ref={refTit} />
						<textarea cols='70' rows='4' name='con' placeholder='content' ref={refCon}></textarea>
						<nav className='btns'>
							<button type='reset' className='canBtn'>
								CANCEL
							</button>
							<button type='submit' className='postBtn'>
								POST
							</button>
						</nav>
					</form>
				</div>
				<div className='showBox'>
					{Post.map((el, idx) => {
						return (
							<article key={el + idx}>
								<div className='txt'>
									<h2>{el.title}</h2>
									<p>{el.content}</p>
								</div>
								<nav>
									<button>Edit</button>
									<button>Delete</button>
								</nav>
							</article>
						);
					})}
				</div>
			</div>
		</Layout>
	);
}
