import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom';
import { IoMdArrowDroprightCircle } from 'react-icons/io';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';

export default function Youtube() {
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');

	const { data: Vids, isSuccess, isError, isLoading } = useYoutubeQuery();

	return (
		<Layout title={'Youtube'}>
			{isLoading && <p>Loading...</p>}
			<section className='YoutubeData'>
				<div className='topYoutube'>
					<div className='youtubeLeft'>
						<h3>Lorem, ipsum dolor.</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam voluptatum ipsum aut ullam veniam aperiam maxime nihil, placeat fugit eius
							corrupti ex ut temporibus assumenda quasi exercitationem maiores iste laborum tenetur ad expedita deserunt sunt neque eos. Sunt placeat,
							unde reprehenderit, laboriosam consequuntur impedit eum esse id obcaecati animi fuga.
						</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit fuga enim dicta ratione illo sapiente libero amet nisi ut, quod eligendi
							facere molestias quibusdam modi voluptatem dignissimos accusamus. Laudantium dicta distinctio eveniet architecto dolor animi.
							Praesentium voluptatem laudantium quibusdam labore.
						</p>
					</div>
					<div className='youtubePic'>
						<img src='/img/youtube2.jpg' alt='diningroom' />
					</div>
				</div>
				<section className='our'>
					<h3>Our Youtube Post</h3>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, saepe.</p>
				</section>

				{isSuccess &&
					Vids?.map(data => {
						// const [date, time] = data.snippet.publishedAt.split('T');

						return (
							<article key={data.id}>
								<div className='left'>
									<div className='pic'>
										<p>
											<Link to={`/detail/${data.id}`}>
												<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
											</Link>
										</p>
									</div>
									<div className='detailButton'>
										<Link to={`/detail/${data.id}`}>
											<IoMdArrowDroprightCircle />
											View Detail
										</Link>
									</div>
									{/* <div className='infoBox'>
										<div className='date'>
											<span>{customText(date, '.')}</span>
											<em>{time.split('Z')[0]}</em>
										</div>
									</div> */}
								</div>
								<div className='txt'>
									<h2>{shortenText(data.snippet.title, 28)}</h2>
									<p>{shortenText(data.snippet.description, 250)}</p>
								</div>
							</article>
						);
					})}
			</section>
			{isError && <p>데이터 반환에 실패했습니다.</p>}
		</Layout>
	);
}
