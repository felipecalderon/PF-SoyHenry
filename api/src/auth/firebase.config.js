const firebase = require('firebase/compat/app');
require('firebase/compat/auth');

const { FBAPIKEY, FBID } = process.env
const firebaseConfig = {
    apiKey: FBAPIKEY,
    authDomain: "pf-soyhenry.firebaseapp.com",
    projectId: "pf-soyhenry",
    storageBucket: "pf-soyhenry.appspot.com",
    messagingSenderId: "959054088030",
    appId: FBID
  };

firebase.initializeApp(firebaseConfig);
const googleProvider = new firebase.auth.GoogleAuthProvider();
 module.exports = {firebase, googleProvider}