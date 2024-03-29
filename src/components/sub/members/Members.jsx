import { useDebounce } from '../../../hooks/useDebounce.js';
import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Members() {
	const history = useHistory();
	const initVal = useRef({ userid: '', email: '', comments: '', pwd1: '', pwd2: '', edu: '', gender: '', interest: [] });
	const [Val, setVal] = useState(initVal.current);
	const DebouncedVal = useDebounce(Val);
	const [Errs, setErrs] = useState({});

	const handleReset = () => {
		setVal(initVal.current);
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleCheck = e => {
		const { name } = e.target;
		const inputs = e.target.parentElement.querySelectorAll('input');
		const checkArr = [];
		inputs.forEach(input => input.checked && checkArr.push(input.value));
		setVal({ ...Val, [name]: checkArr });
	};

	const handleSubmit = e => {
		e.preventDefault();

		if (Object.keys(check(Val)).length === 0) {
			alert('Congratulations on your membership.');
			history.push('/');
		}
	};

	const check = value => {
		const errs = {};
		const num = /[0-9]/;
		const txt = /[a-zA-Z]/;
		const spc = /[!@#$%^&*()[\]_.+]/;
		const [m1, m2] = value.email.split('@');
		const m3 = m2 && m2.split('.');

		if (value.userid.length < 5) errs.userid = 'Please enter at least 5 characters.';
		if (value.comments.length < 10) errs.comments = 'Please enter at least 10 characters.';
		if (!value.gender) errs.gender = 'Please choose a gender.';
		if (value.interest.length === 0) errs.interest = 'Please choose your interests.';
		if (!value.edu) errs.edu = 'Please choose your final academic background.';
		if (value.pwd1 !== value.pwd2 || !value.pwd2) errs.pwd2 = 'Please enter the same password.';
		if (!m1 || !m2 || !m3[0] || !m3[1]) errs.email = 'Please enter it in email format.';
		if (!num.test(value.pwd1) || !txt.test(value.pwd1) || !spc.test(value.pwd1) || value.pwd1.length < 5)
			errs.pwd1 = 'Please enter a password of at least 5 characters including all special characters, letters, and numbers.';

		if (!/@/.test(value.email)) {
			errs.email = "Please enter with '@'.";
		} else {
			const [forward, backward] = value.email.split('@');
			if (!forward || !backward) {
				errs.email = "All characters must be included before and after '@'.";
			} else {
				const [forward, backward] = value.email.split('.');
				if (!forward || !backward) {
					errs.email = "All characters must be included before and after '.'.";
				}
			}
		}

		return errs;
	};

	useEffect(() => {
		setErrs(check(DebouncedVal));
	}, [DebouncedVal]);
	return (
		<Layout title={'Members'}>
			<div className='wrap'>
				<div className='memberPic'>
					<img src='/img/image.jpg' alt='diningroom' />
				</div>
				<div className='formBox'>
					<h3>Join us</h3>
					<form onSubmit={handleSubmit}>
						<fieldset>
							<legend className='h'>Membership form</legend>
							<table>
								<tbody>
									<tr>
										<td>
											<input type='text' name='userid' placeholder='ID' value={Val.userid} onChange={handleChange} />
											{Errs.userid && <p>{Errs.userid}</p>}
										</td>
									</tr>
									<tr>
										<td>
											<input type='text' name='email' placeholder='Email' value={Val.email} onChange={handleChange} />
											{Errs.email && <p>{Errs.email}</p>}
										</td>
									</tr>
									<tr>
										<td>
											<input type='password' name='pwd1' placeholder='Password' value={Val.pwd1} onChange={handleChange} />
											{Errs.pwd1 && <p>{Errs.pwd1}</p>}
										</td>
									</tr>
									<tr>
										<td>
											<input type='password' name='pwd2' placeholder='Re-Password' value={Val.pwd2} onChange={handleChange} />
											{Errs.pwd2 && <p>{Errs.pwd2}</p>}
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<select name='edu' onChange={handleChange}>
												<option value=''>Education</option>
												<option value='elementary-school'>Elementary school</option>
												<option value='middle-school'>Middle school</option>
												<option value='high-school'>High school</option>
												<option value='college'>University</option>
											</select>
											{Errs.edu && <p>{Errs.edu}</p>}
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<input type='radio' defaultValue='female' id='female' name='gender' onChange={handleChange} />
											<label htmlFor='female'>Female</label>
											<input type='radio' defaultValue='male' id='male' name='gender' onChange={handleChange} />
											<label htmlFor='male'>Male</label>
											{Errs.gender && <p>{Errs.gender}</p>}
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<input type='checkbox' name='interest' id='sports' defaultValue='sports' onChange={handleCheck} />
											<label htmlFor='sports'>Sports</label>
											<input type='checkbox' name='interest' id='reading' defaultValue='reading' onChange={handleCheck} />
											<label htmlFor='reading'>Reading</label>
											<input type='checkbox' name='interest' id='music' defaultValue='music' onChange={handleCheck} />
											<label htmlFor='music'>Music</label>
											<input type='checkbox' name='interest' id='game' defaultValue='game' onChange={handleCheck} />
											<label htmlFor='camping'>Camping</label>
											{Errs.interest && <p>{Errs.interest}</p>}
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<textarea
												name='comments'
												cols='30'
												rows='5'
												placeholder='Leave a comment'
												value={Val.comments}
												onChange={handleChange}></textarea>
											{Errs.comments && <p>{Errs.comments}</p>}
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<div className='formbutton'>
												<input type='reset' value='Cancel' onClick={handleReset} />
												<input type='submit' value='Submit' />
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>
			</div>
		</Layout>
	);
}
