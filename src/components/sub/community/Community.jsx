import Layout from '../../common/layout/Layout';
import './Community.scss';
import { useEffect, useRef, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';

export default function Community() {
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};
	const [Post, setPost] = useState(getLocalData());
	const refTit = useRef(null);
	const refCon = useRef(null);

	const resetPost = () => {
		refTit.current.value = '';
		refCon.current.value = '';
	};

	const createPost = () => {
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
		setPost([{ title: refTit.current.value, content: refCon.current.value }, ...Post]);
		resetPost();
	};

	const deletePost = delIndex => {
		setPost(Post.filter((_, idx) => delIndex !== idx));
	};

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

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
							<button onClick={resetPost} className='canBtn'>
								CANCEL
							</button>
							<button onClick={createPost} className='postBtn'>
								POST
							</button>
						</nav>
					</form>
				</div>
				<div className='showBox'>
					{Post.map((el, idx) => {
						return (
							<article key={el + idx}>
								<div className='cloBtn'>
									<button className='btn1' onClick={() => deletePost(idx)}>
										<IoCloseOutline />
									</button>
								</div>
								<div className='txt'>
									<h2>{el.title}</h2>
									<p>{el.content}</p>
								</div>
								<div className='ediBtn'>
									<button className='btn2'>EDIT</button>
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</Layout>
	);
}
