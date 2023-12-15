import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const { kakao } = window;
	const [Index, setIndex] = useState(0);
	const mapFrame = useRef(null);
	const marker = useRef(null);
	const mapInfo = useRef([
		{
			title: '이케아 고양점',
			latlng: new kakao.maps.LatLng(37.629957, 126.862974),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) }
		},
		{
			title: '이케아 광명점',
			latlng: new kakao.maps.LatLng(37.42452, 126.881864),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) }
		},
		{
			title: '이케아 기흥점',
			latlng: new kakao.maps.LatLng(37.222253, 127.116268),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) }
		}
	]);

	marker.current = new kakao.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.maps.MarkerImage(mapInfo.current[Index].imgSrc, mapInfo.current[Index].imgSize, mapInfo.current[Index].imgOpt)
	});

	useEffect(() => {
		const mapInstance = new kakao.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3
		});
		marker.current.setMap(mapInstance);
	}, [Index, kakao]);

	return (
		<Layout title={'Contact'}>
			<ul className='branch'>
				{mapInfo.current.map((el, idx) => (
					<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
						{el.title}
					</button>
				))}
			</ul>
			<article className='mapBox' ref={mapFrame}></article>
		</Layout>
	);
}
