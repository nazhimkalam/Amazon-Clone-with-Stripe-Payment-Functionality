const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(
	'sk_test_51HQUFsJZkdK4Zudi0HUaeOUtHWhg1NrgjGOUFeN14oDj0dunEjc3UeSaBsOknxt6gUTv4lkCwJu9Loga561MFEzU00xtzddZxy'
);

// - App config
const app = express();

// - Middleware
app.use(cors({ origin: true }));
app.use(express.json());

// - API Routes
app.get('/', (req, res) => res.status(200).send('hello world'));

app.post('/payments/create', async (req, res) => {
	const total = req.query.total;
	console.log('Payment Request Recieved for this amount -->', total);

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		currency: 'usd',
	});

	// OK - Created
	res.status(201).send({
		clientSecret: paymentIntent.client_secret,
	});
});

// - Listen
exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-with-stripe/us-central1/api
