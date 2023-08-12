
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyAljRkn9KR9DqyGVzdJCexxAWAo_kwhHSY",
  
    authDomain: "chat-for-international-focus.firebaseapp.com",
  
    projectId: "chat-for-international-focus",
  
    storageBucket: "chat-for-international-focus.appspot.com",
  
    messagingSenderId: "380899558642",
  
    appId: "1:380899558642:web:bcd65eaa6d8a4d472bbc6b"
  
  };
  

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let timestamp = firebase.firestore.FieldValue.serverTimestamp;
let storage = firebase.storage();
// let getStorage = firebase.storage.get();
export {db, timestamp,storage};    

