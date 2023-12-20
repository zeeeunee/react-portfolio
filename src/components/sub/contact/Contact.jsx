import { useEffect, useRef, useState, useCallback } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';
import emailjs from '@emailjs/browser';

export default function Contact() {
	const form = useRef();

	const resetForm = () => {
		const elArr = form.current.children;

		Array.from(elArr).forEach(el => {
			console.log(el);
			if (el.name === 'user_name' || el.name === 'user_email' || el.name === 'message') el.value = '';
		});
	};
	const sendEmail = e => {
		e.preventDefault();

		const [user, email] = form.current.querySelectorAll('input');
		const txtArea = form.current.querySelector('textarea');

		if (!user.value || !email.value || !txtArea.value) return alert('이름, 이메일주소 문의내용을 모두 입력하세요.');

		emailjs.sendForm('service_1gzi4dl', 'template_8l9j4yu', form.current, 'SbGYfi4rN5zFsWjvZ').then(
			result => {
				alert('문의 내용이 성공적으로 전송되었습니다.');
				resetForm();
			},
			error => {
				alert('일시적인 장애로 문의 전송에 실패했습니다. 다음의 메일주소로 보내주세요.');
				resetForm();
			}
		);
	};

	const kakao = useRef(window.kakao);
	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [View, setView] = useState(false);
	const mapFrame = useRef(null);
	const viewFrame = useRef(null);
	const marker = useRef(null);
	const mapInstance = useRef(null);

	const mapInfo = useRef([
		{
			title: 'IKEA GOYANG',
			latlng: new kakao.current.maps.LatLng(37.628636, 126.862218),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: 'IKEA GWANGMYEONG',
			latlng: new kakao.current.maps.LatLng(37.42452, 126.881864),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: 'IKEA GIHEUMG',
			latlng: new kakao.current.maps.LatLng(37.222474, 127.114621),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		}
	]);

	marker.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(mapInfo.current[Index].imgSrc, mapInfo.current[Index].imgSize, mapInfo.current[Index].imgOpt)
	});
	const roadview = useRef(() => {
		new kakao.current.maps.RoadviewClient().getNearestPanoId(mapInfo.current[Index].latlng, 50, panoId => {
			new kakao.current.maps.Roadview(viewFrame.current).setPanoId(panoId, mapInfo.current[Index].latlng);
		});
	});
	const setCenter = useCallback(() => {
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
		roadview.current();
	}, [Index]);

	useEffect(() => {
		mapFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3
		});
		marker.current.setMap(mapInstance.current);
		setTraffic(false);
		setView(false);

		roadview.current();

		mapInstance.current.addControl(new kakao.current.maps.MapTypeControl(), kakao.current.maps.ControlPosition.TOPRIGHT);

		mapInstance.current.addControl(new kakao.current.maps.ZoomControl(), kakao.current.maps.ControlPosition.RIGHT);

		mapInstance.current.setZoomable(false);
		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index, setCenter]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout title={'Contact'}>
			<div id='mailSection'>
				<div className='mailLeft'>
					<h2>Get In Touch</h2>
					<p className='p1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium enim, quibusdam aut perspiciatis at veritatis.</p>
					<p className='p2'>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum eligendi nobis accusantium in rerum! Voluptatibus voluptatum reprehenderit
						facilis nesciunt mollitia ducimus alias libero. Culpa minus consequatur illo ipsum dolorem earum.
					</p>
				</div>
				<form ref={form} onSubmit={sendEmail}>
					<input type='text' name='user_name' placeholder='NAME' />
					<input type='email' name='user_email' placeholder='EMAIL' />
					<textarea name='message' placeholder='MESSAGE' />
					<input className='emailButton' type='submit' value='Send' />
				</form>
			</div>
			<div id='mapSection'>
				<div className='controlBox'>
					<nav className='branch'>
						{mapInfo.current.map((el, idx) => (
							<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
								{el.title}
							</button>
						))}
					</nav>
					<nav className='traffic'>
						<button onClick={() => setTraffic(!Traffic)}>{Traffic ? 'TRAFFIC OFF' : 'TRAFFIC ON'}</button>
						<button onClick={() => setView(!View)}>{View ? 'MAP' : 'ROAD VIEW'}</button>
					</nav>
				</div>
				<section className='tab'>
					<article className={`mapBox ${View ? '' : 'on'}`} ref={mapFrame}></article>
					<article className={`viewBox ${View ? 'on' : ''}`} ref={viewFrame}></article>
				</section>
			</div>
		</Layout>
	);
}
