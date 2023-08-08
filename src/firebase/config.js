
import firebase from "firebase/app";
import "firebase/firestore";
// import "firebase/storage";
// import { getStorage, ref, uploadBytes } from "firebase/storage";

// import "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {

  apiKey: "AIzaSyCrj-t2jjGNm2F-eFlH5rHlbiVyyewBG80",

  authDomain: "vue-advanced-chat-565b3.firebaseapp.com",

  databaseURL: "https://vue-advanced-chat-565b3-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "vue-advanced-chat-565b3",

  storageBucket: "vue-advanced-chat-565b3.appspot.com",

  messagingSenderId: "119266723804",

  appId: "1:119266723804:web:11ad6f4a1c3c3aec8bf119"

  };
  

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let timestamp = firebase.firestore.FieldValue.serverTimestamp;
// const storage = getStorage();
// const storageRef = ref(storage, 'UserImage');


export {db, timestamp};    

