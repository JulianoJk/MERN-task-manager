import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../Button/Button';
import Logo from '../../../images/logo.png';
import '../Auth.css';
import { useTaskDispatch } from '../../../context/TaskContext';

const Login = () => {
	const navigate = useNavigate();
	const taskDispatch = useTaskDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const onPasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleInputs = async (event) => {
		event.preventDefault();
		const response = await fetch('http://localhost:3001/users/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				password: password,
			}),
		});
		const data = await response.json();
		if (response.ok == true) {
			const user = {
				id: data['id'],
				username: data['username'],
				token: data['token'],
			};
			taskDispatch({ type: 'SET_USER', user: user });
			taskDispatch({ type: 'SET_IS_LOGGED_IN', isLoggedIn: true });
			navigate('/home');
		} else if (response.ok == false) {
			console.warn(data.message);
			alert(data.message);
		}
	};

	return (
		<div className="container flex-column input-container w-50 p-3 border border_style">
			<div>
				<img src={Logo} alt="Logo-image" className="rounded mx-auto d-block " />
			</div>
			<h1 className="title">Login</h1>
			<form onSubmit={handleInputs}>
				<label htmlFor="email" className="control-label text">
					<strong>Email:</strong>
				</label>
				<input
					type="email"
					value={email}
					className="form-control"
					id="email"
					placeholder="name@example.com"
					onChange={onEmailChange}
					autoComplete="on"
				/>
				<br />

				<label htmlFor="password" className="control-label text">
					<strong>Password:</strong>
				</label>
				<input
					type="password"
					value={password}
					className="form-control"
					id="password"
					onChange={onPasswordChange}
					placeholder="Password"
					autoComplete="on"
				/>
				<br />
				<div className="d-grid gap-2">
					<Button text={'Submit'} />
				</div>
			</form>
			<Link to="/password-reset" className="text flex-wrap link-light">
				Forgot your password?
			</Link>
			<br />
			<Link to="/register" className="text flex-wrap link-light">
				Not a member?
			</Link>
		</div>
	);
};

export default Login;
