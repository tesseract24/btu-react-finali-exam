import firebase from "firebase/app"
import 'firebase/firestore';
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyB9Pz7noa5BHBzp9653bqOpoB410TKcAQg",
    authDomain: "reactfinalexam.firebaseapp.com",
    projectId: "reactfinalexam",
    storageBucket: "reactfinalexam.appspot.com",
    messagingSenderId: "291226990077",
    appId: "1:291226990077:web:61fbbce7040f7433c61594"
})

const db = app.firestore();
const auth = app.auth()

export {db , auth};
export default app
