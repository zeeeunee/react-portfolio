import './Footer.scss';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
	return (
		<footer className='Footer'>
			<section>
				<div className='FooterBox1'>
					<h2>Zeeeunee</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti deserunt ratione dignissimos, maiores sint enim rerum iusto temporibus
						autem provident distinctio.
					</p>
					<ul>
						<li>
							<FaInstagram />
						</li>
						<li>
							<FaTwitter />
						</li>
						<li>
							<FaFacebook />
						</li>
					</ul>
				</div>
				<div className='FooterBox2'>
					<h2>Helpful Links</h2>
					<ul>
						<li>About Us</li>
						<li>Features</li>
						<li>FAQ's</li>
						<li>Blog</li>
					</ul>
				</div>
				<div className='FooterBox3'>
					<h2>Support</h2>
					<ul>
						<li>Privacy Policy</li>
						<li>Terms of Use</li>
						<li>Support Center</li>
						<li>Contact</li>
					</ul>
				</div>
				<div className='FooterBox4'>
					<h2>Contact Us</h2>
					<ul>
						<li>Lorem ipsum dolor sit amet consectetur adipisicing elit.</li>
						<li>Phone : 000-000-0000</li>
						<li>Email : wldmstv@gmail.com</li>
					</ul>
				</div>
				<p className='Copy'>2023 Zeeeunee &Copy; All Rights Reserved.</p>
			</section>
		</footer>
	);
}
