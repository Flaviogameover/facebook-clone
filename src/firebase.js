import firebase from 'firebase';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCIFH0L6oSytq3DUFbcey2OlxjzXCf2PEk",
    authDomain: "not-facebook-javascript.firebaseapp.com",
    projectId: "not-facebook-javascript",
    storageBucket: "not-facebook-javascript.appspot.com",
    messagingSenderId: "371979050892",
    appId: "1:371979050892:web:a4236e7008cbd8f69e40a9",
    measurementId: "G-VHW57KJXE4"
});


const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();



export {db, auth, storage, functions};