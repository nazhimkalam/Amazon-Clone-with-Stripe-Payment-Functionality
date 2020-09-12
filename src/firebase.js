import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyAf4t4HTizNcmEDWraO03DH6qU8dlZ-ZdE',
	authDomain: 'clone-860ee.firebaseapp.com',
	databaseURL: 'https://clone-860ee.firebaseio.com',
	projectId: 'clone-860ee',
	storageBucket: 'clone-860ee.appspot.com',
	messagingSenderId: '1073619677262',
	appId: '1:1073619677262:web:9beb4578eda8dd651b531f',
	measurementId: 'G-6DT63SJG8C',
});

const auth = firebase.auth();

export { auth };
