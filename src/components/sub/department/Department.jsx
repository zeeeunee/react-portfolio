import { useEffect, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department() {
	const [HistoryTit, setHistoryTit] = useState('');
	const [HistoryData, setHistoryData] = useState([]);
	const [MemberTit, setMemberTit] = useState('');
	const [MemberData, setMemberData] = useState([]);

	const path = process.env.PUBLIC_URL;

	const fetchDepartment = () => {
		fetch(`${path}/DB/department.json`)
			.then(data => data.json())
			.then(json => {
				setMemberTit(Object.keys(json)[0]);
				setMemberData(Object.values(json)[0]);
			});
	};

	const fetchHistory = () => {
		fetch(`${path}/DB/history.json`)
			.then(data => data.json())
			.then(json => {
				setHistoryTit(Object.keys(json)[0]);
				setHistoryData(Object.values(json)[0]);
			});
	};

	useEffect(() => {
		fetchDepartment();
		fetchHistory();
	}, []);

	return (
		<Layout title={'Department'}>
			{/* <h2>{HistoryTit}</h2> */}

			<div className='historyGray'>
				<section className='grayImage'>
					<article>
						<img src='/img/gray1.jpg' alt='grayimage1' />
					</article>
					<article>
						<img src='/img/gray2.jpg' alt='grayimage2' />
					</article>
				</section>
				<section className='grayRightBox'>
					<h2>History Our Creation</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente fuga molestias, suscipit omnis quis vel accusantium rerum debitis
						ullam! Voluptatem consequatur quidem libero maiores, expedita beatae unde autem corrupti cum doloribus velit deserunt! Perspiciatis,
						reprehenderit dignissimos delectus maxime vitae illo!
					</p>
				</section>
			</div>
			<section className='historyBox'>
				<div className='con'>
					{HistoryData.map((history, idx) => {
						return (
							<article key={history + idx}>
								<h3>{Object.keys(history)[0]}</h3>

								<ul>
									{Object.values(history)[0].map((list, idx) => {
										return <li key={list + idx}>{list}</li>;
									})}
								</ul>
							</article>
						);
					})}
				</div>
			</section>
			{/* <h2>{MemberTit}</h2> */}

			<section className='memberBox'>
				<h3>A team United by shared values</h3>
				<div className='leftBox'>
					<h3>6</h3>
					<p>Professional Designers in our Team</p>
				</div>
				<div className='memberPics'>
					{MemberData.map((member, idx) => {
						return (
							<article key={member + idx}>
								<img src={`${path}/img/${member.pic}`} alt={member.name} />
								<h3>{member.name}</h3>
								{/* <p>{member.position}</p> */}
							</article>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}
