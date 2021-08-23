import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
require('dotenv').config()

var config = {
    apiKey: "AIzaSyBEC7xcBGF96IWGlLke3e51Xkx1FmXFubg",
    authDomain: "torqata-dashboard.firebaseapp.com",
    projectId: "torqata-dashboard",
    storageBucket: "torqata-dashboard.appspot.com",
    messagingSenderId: "37537403062",
    appId: "1:37537403062:web:bd371bbb171abe74979617"
};


firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 