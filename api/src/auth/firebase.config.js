const firebase = require('firebase/compat/app');
require('firebase/compat/auth');

// const { FBAPIKEY, FBID } = process.env
const firebaseConfig = {
  apiKey: "AIzaSyCUbEa3Z-kEld2zqULuWRBdvoZt31zvwi0",
  authDomain: "fusionajobs-e2a1a.firebaseapp.com",
  projectId: "fusionajobs-e2a1a",
  storageBucket: "fusionajobs-e2a1a.appspot.com",
  messagingSenderId: "110189196879",
  appId: "1:110189196879:web:12b394ff075e27b3bb1c3a"
  };

firebase.initializeApp(firebaseConfig);
const googleProvider = new firebase.auth.GoogleAuthProvider();
module.exports = {firebase, googleProvider}