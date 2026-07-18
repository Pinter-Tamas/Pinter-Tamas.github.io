// 🔥 Firebase konfiguráció
// Firebase Console → Project settings → General → Your apps → Web app

const firebaseConfig = {
  apiKey: "AIzaSyALb6wHKYLPHn0HNzhCuWVNmEaLHpvtlgA",
  authDomain: "pinter-tamas-website.firebaseapp.com",
  projectId: "pinter-tamas-website",
  storageBucket: "pinter-tamas-website.firebasestorage.app",
  messagingSenderId: "314001158245",
  appId: "1:314001158245:web:ace88e308fb8ccf4cc168c"
};

// Firebase inicializálás
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();