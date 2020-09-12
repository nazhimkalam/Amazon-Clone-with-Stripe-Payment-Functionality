import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import CheckOut from './CheckOut';
import Login from './Login';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import Payment from './Payment/Payment';

import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(
	'pk_test_51HQUFsJZkdK4ZudiLBulkny2bc1YyI7c2WZDOAI6HYT8aQB8gMx8iYcKjAnXMIXyJE8Xw9GTJ7PH69glYIOwdXQ500T253cpZS'
);

function App() {
	const [{ user }, dispatch] = useStateValue();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// the user is logged in...

				dispatch({
					type: 'SET_USER',
					user: authUser,
				});
			} else {
				// the user is logged out...
				dispatch({
					type: 'SET_USER',
					user: null,
				});
			}
		});

		return () => {
			unsubscribe();
		};
	}, [dispatch]);

	console.log(user);

	return (
		// Set up React Router
		<Router>
			<div className="app">
				<Switch>
					{/* Note that these routing is still considered as a single page application */}
					{/* routing to the checkout page */}
					<Route path="/checkout">
						<Header />
						<CheckOut />
					</Route>
					{/* routing to the login page */}
					<Route path="/login">
						<Login />
					</Route>
					{/* routing to the payment page */}
					<Route path="/payment">
						<Header />
						<Elements stripe={promise}>
							<Payment />
						</Elements>
					</Route>
					{/* This is the default page */}
					<Route path="/">
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
