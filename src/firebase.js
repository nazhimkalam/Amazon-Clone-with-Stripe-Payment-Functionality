import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyAwYQJLzSLQh6G_hic9JALaZ5jGAwvR3tQ',
	authDomain: 'clone-with-stripe.firebaseapp.com',
	databaseURL: 'https://clone-with-stripe.firebaseio.com',
	projectId: 'clone-with-stripe',
	storageBucket: 'clone-with-stripe.appspot.com',
	messagingSenderId: '1063017607058',
	appId: '1:1063017607058:web:42266a1556fc8bbca25b4b',
	measurementId: 'G-3LNGM87GMJ',
});


const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
