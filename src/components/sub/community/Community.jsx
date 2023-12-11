import { useState } from 'react';
import CommunityModal from '../../common/communityModal/CommunityModal';
import Layout from '../../common/layout/Layout';
import './Community.scss';
import { FiPlusCircle } from 'react-icons/fi';

export default function Community() {
	const [Open, setOpen] = useState(false);
	const openModal = (e) => {
		setOpen(true);
	};
	return (
		<>
			<Layout title={'Community'}>
				<section>
					<button
						onClick={() => {
							setOpen(true);
						}}
					>
						<FiPlusCircle />
					</button>
				</section>
			</Layout>

			{Open && <CommunityModal Open={Open} setOpen={setOpen}></CommunityModal>}
		</>
	);
}
