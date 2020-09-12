import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	const login = (event) => {
		event.preventDefault(); // this stops refreshing of the web page when submit button is clicked nor enter key
		// login Logic...

		// this is a build in method for auth
		auth.signInWithEmailAndPassword(email, password) // this returns a promise
			.then((auth) => {
				// login the user and redirect to the homepage
				history.push('/'); // redirecting to the homepage
			})
			.catch((error) => alert(error));
	};

	const register = (event) => {
		event.preventDefault(); // this stops refreshing of the web page when submit button is clicked nor enter key
		// register Logic...

		// this is a build in method for auth
		auth.createUserWithEmailAndPassword(email, password) // this returns a promise
			.then((auth) => {
				// created user, logged in, redirect to the home page
				history.push('/'); // redirecting to the homepage
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="login">
			{/* Adding the logo */}
			<Link to="/">
				{/* the to="/" directs to the localhost homepage */}
				<img src="https://pngimg.com/uploads/amazon/amazon_PNG6.png" alt="logo" className="login__logo" />
			</Link>
			<div className="login__container">
				<h1>Sign in</h1>
				<form>
					<h5>Email</h5>
					<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" />

					<h5>Password</h5>
					<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />

					<button onClick={login} type="submit" className="login__signInBtn">
						Sign in
					</button>

					<p>
						By signing-in you agree to Amazon's Condition of Use & Sale. Please see our Privacy Notice, our
						Cookies Notice and our Interest-Based Ads Notice.
					</p>

					<button onClick={register} className="login__registerInBtn">
						Create your Amazon Account
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
