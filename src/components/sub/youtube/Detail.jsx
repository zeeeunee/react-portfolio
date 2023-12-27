import { useRef } from 'react';
import { useYoutubeQueryById } from '../../../hooks/useYoutubeQuery';
import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useParams } from 'react-router-dom';

export default function Detail() {
	const refTitle = useRef(null);
	const { id } = useParams();
	const { data: YoutubeData, isSuccess } = useYoutubeQueryById(id);

	return (
		<Layout title={'Detail'}>
			{isSuccess && YoutubeData && (
				<article>
					<div className='videoBox'>
						<iframe src={`https://www.youtube.com/embed/${YoutubeData?.resourceId.videoId}`} title={YoutubeData?.title}></iframe>
					</div>
					<h3 ref={refTitle}>{YoutubeData?.title}</h3>
					<p>{YoutubeData?.description}</p>
				</article>
			)}
			;
		</Layout>
	);
}
