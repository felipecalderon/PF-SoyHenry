const firebase = require('firebase/compat/app');
require('firebase/compat/auth');

// const { FBAPIKEY, FBID } = process.env
const firebaseConfig = {
  apiKey: "AIzaSyCOk2DbOsSsFM2E8sNikvSgpQuoz5dWOCI",
  authDomain: "fusionajobs.firebaseapp.com",
  projectId: "fusionajobs",
  storageBucket: "fusionajobs.appspot.com",
  messagingSenderId: "976443979260",
  appId: "1:976443979260:web:f75bb989248f1d0385ee79",
  measurementId: "G-FCFZRP4H4E"
  };

firebase.initializeApp(firebaseConfig);
const googleProvider = new firebase.auth.GoogleAuthProvider();
module.exports = {firebase, googleProvider}