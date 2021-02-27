import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCpdITSvCR_FHrMCF1uptwMHRmPHDwJ_eA",
    authDomain: "worldrive-1ecf4.firebaseapp.com",
    projectId: "worldrive-1ecf4",
    storageBucket: "worldrive-1ecf4.appspot.com",
    messagingSenderId: "287345669165",
    appId: "1:287345669165:web:0a2714fb567cfa92c874a4",
    measurementId: "G-XL5Z3GER15"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };