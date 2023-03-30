const firebase = require('firebase/app');
const admin = require('firebase-admin');
const { FBAPIKEY, FBID } = process.env
const firebaseConfig = {
  apiKey: FBAPIKEY,
  authDomain: "pf-soyhenry.firebaseapp.com",
  projectId: "pf-soyhenry",
  storageBucket: "pf-soyhenry.appspot.com",
  messagingSenderId: "959054088030",
  appId: FBID
  };

const clavePrivada = require("./firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(clavePrivada),
    databaseURL: 'firebase-adminsdk-3drz5@pf-soyhenry.iam.gserviceaccount.com'
});
firebase.initializeApp(firebaseConfig);
module.exports = {firebase, admin}