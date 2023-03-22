const firebase = require('firebase/app');

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
module.exports = firebase