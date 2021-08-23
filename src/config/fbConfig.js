import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
require('dotenv').config()

var config = {
    apiKey: process.env.MY_SECRET_KEY,
    authDomain: "torqata-dashboard.firebaseapp.com",
    projectId: "torqata-dashboard",
    storageBucket: "torqata-dashboard.appspot.com",
    messagingSenderId: process.env.SENDER_ID,
    appId: process.env.APP_ID
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 