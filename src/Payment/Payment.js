import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useHistory } from 'react-router-dom';
import CheckOutProduct from '../CheckOutProduct';
import { getBasketTotal } from '../reducer';
import { useStateValue } from '../StateProvider';
import './Payment.css';
import axios from '../axios';
import { db } from '../firebase';

function Payment() {
	const [{ basket, user }, dispatch] = useStateValue();
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const history = useHistory();

	const stripe = useStripe();
	const elements = useElements();
	const [processing, setProcessing] = useState('');
	const [succeeded, setSucceeded] = useState(false);
	const [clientSecret, setClientSecret] = useState(true);

	useEffect(() => {
		// generate the special stripe secret which allows us to change a customer

		const getClientSecret = async () => {
			const response = await axios({
				method: 'post',
				// Stripe expects the total in a currencies subunits eg:- $1 -> 100 cents
				url: `/payments/create?total=${getBasketTotal(basket) * 100}`,
			});
			setClientSecret(response.data.clientSecret);
		};

		getClientSecret();
	}, [basket]);

	console.log('The secret is >>>', clientSecret);

	const handleSubmit = async (event) => {
		// do all the fancy stripe stuff . . .
		event.preventDefault();
		setProcessing(true);

		const payload = await stripe
			.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
				},
			})
			.then(({ paymentIntent }) => {
				// paymentIntent  = payment confirmation which is returned as a response

				db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
					basket: basket,
					amount: paymentIntent.amount,
					created: paymentIntent.created,
				});

				setSucceeded(true);
				setError(null);
				setProcessing(false);

				dispatch({
					type: 'EMPTY_BASKET',
				});

				history.replace('/orders'); // redirecting the user to the orders page
			});
	};

	const handleChange = (event) => {
		// listen for changes in the CardElement and display any errors as the customer types card details.
		setDisabled(event.empty);
		setError(event.error ? event.error.message : '');
	};

	return (
		<div className="payment">
			<div className="payment__container">
				<h1>
					Checkout (<Link to="/checkout">{basket?.length} items</Link>)
				</h1>
				{/* Payment section - delivery address */}
				<div className="payment__section">
					<div className="payment__title">
						<h3>Delivery Address</h3>
					</div>
					<div className="payment__address">
						<p>{user?.email}</p>
						<p>123 React Lane</p>
						<p>Los Angeles, CA</p>
					</div>
				</div>

				{/* Payment section - review items */}
				<div className="payment__section">
					<div className="payment__title">
						<h3>Review items and delivery</h3>
					</div>
					<div className="payment__items">
						{basket.map((item) => (
							<CheckOutProduct
								id={item?.id}
								title={item?.title}
								image={item?.image}
								price={item?.price}
								rating={item?.rating}
							/>
						))}
					</div>
				</div>

				{/* Payment section - payment method */}
				<div className="payment__section">
					<div className="payment__title">
						<h3>Payment Method</h3>
					</div>

					<div className="payment__details">
						{/* Stripe Payment Method */}

						<form onSubmit={handleSubmit}>
							<CardElement onChange={handleChange} />
							<div className="payment__priceContainer">
								<CurrencyFormat
									renderText={(value) => <h3>Order Total: {value}</h3>}
									decimalScale={2}
									value={getBasketTotal(basket)}
									displayType={'text'}
									thousandSeparator={true}
									prefix={'$'}
								/>
								<button disabled={processing || disabled || succeeded}>
									<span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
								</button>

								{/* Error */}
								{error && <div>{error}</div>}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Payment;
