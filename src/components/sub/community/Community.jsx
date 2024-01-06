import Layout from '../../common/layout/Layout';
import './Community.scss';
import { useEffect, useRef, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';
import postData from '../../main/info/dummyPosts.json';

export default function Community() {
	const changeText = useCustomText('combined');
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};
	const [Post, setPost] = useState(getLocalData());
	const refTit = useRef(null);
	const refCon = useRef(null);

	const refEditTit = useRef(null);
	const refEditCon = useRef(null);

	const editMode = useRef(false);

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
		setPost([{ title: refTit.current.value, content: refCon.current.value, date: new Date(korTime) }, ...Post]);
		resetPost();
	};

	const enableUpdate = editIndex => {
		if (editMode.current) return;
		editMode.current = true;
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = true;
				return el;
			})
		);
	};

	const disableUpdate = editIndex => {
		editMode.current = false;
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = false;
				return el;
			})
		);
	};

	const updatePost = updateIndex => {
		if (!refEditTit.current.value.trim() || !refEditCon.current.value.trim()) {
			return alert('수정할 글의 제목과  본문을 모두 입력하세요.');
		}
		editMode.current = false;

		setPost(
			Post.map((el, idx) => {
				if (updateIndex === idx) {
					el.title = refEditTit.current.value;
					el.content = refEditCon.current.value;
					el.enableUpdate = false;
				}
				return el;
			})
		);
	};

	const deletePost = delIndex => {
		if (!window.confirm('해당 게시글을 삭제하겠습니까?')) return;
		setPost(Post.filter((_, idx) => delIndex !== idx));
	};

	useEffect(() => {
		Post.map(el => (el.enableUpdate = false));
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<Layout title={'Community'}>
			<div className='CommunityWrap'>
				<div className='inputBox'>
					<form>
						<h2>Create Post!</h2>
						<div className='formTxt'>
							<input type='text' placeholder='title' name='tit' ref={refTit} />
							<textarea cols='22' rows='5' name='con' placeholder='content' ref={refCon}></textarea>
						</div>
						<nav>
							<button onClick={resetPost}>Cancel</button>
							<button onClick={createPost}>Post</button>
						</nav>
					</form>
				</div>
				<div className='showBox'>
					{Post.map((el, idx) => {
						const date = JSON.stringify(el.date);
						const strDate = changeText(date.split('T')[0].slice(1), '.');
						if (el.enableUpdate) {
							return (
								<article key={el + idx}>
									<span>{strDate}</span>
									<div className='txt'>
										<input type='text' defaultValue={el.title} ref={refEditTit} />
										<textarea cols='22' rows='7' defaultValue={el.content} ref={refEditCon}></textarea>
									</div>
									<nav>
										<button onClick={() => disableUpdate(idx)}>Cancel</button>
										<button onClick={() => updatePost(idx)}>Update</button>
									</nav>
								</article>
							);
						} else {
							return (
								<article key={el + idx}>
									<span>{strDate}</span>

									<div className='txt'>
										<h2>{el.title}</h2>
										<p>{el.content}</p>
									</div>

									<nav>
										<button onClick={() => deletePost(idx)}>Close</button>
										<button onClick={() => enableUpdate(idx)}>Edit</button>
									</nav>
								</article>
							);
						}
					})}
				</div>
			</div>
		</Layout>
	);
}
