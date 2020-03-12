//import * as firebase from 'firebase';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDQu0OQqoTbc_gL0xbPRMCD1PLj_5UekUs",
    authDomain: "pet-portal.firebaseapp.com",
    databaseURL: "https://pet-portal.firebaseio.com",
    projectId: "pet-portal",
    storageBucket: "pet-portal.appspot.com",
    messagingSenderId: "851837780219",
    appId: "1:851837780219:web:88b05a5254010cf4aa305e"
  };

  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth();
  export const db = firebase.firestore();
  export const storage = firebase.storage();