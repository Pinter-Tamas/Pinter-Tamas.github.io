// 🔥 Firebase Training konfiguráció
// Ugyanaz a Firebase projekt, de a 'training' Firestore adatbázist használja

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
// Training adatbázis — a 'training' nevű Firestore database
const db = firebase.firestore(firebase.app(), 'training');

// Auth state figyelő
auth.onAuthStateChanged(function(user) {
  if (user) {
    // Ellenőrizzük, hogy van-e training regisztrációja
    db.collection('parents').doc(user.uid).get().then(function(doc) {
      if (doc.exists && doc.data().registered) {
        // Be van regisztrálva a training rendszerbe
        window.trainingUser = { uid: user.uid, ...doc.data() };
      } else {
        // Nincs még training regisztráció
        window.trainingUser = null;
      }
      if (window.onTrainingAuthReady) window.onTrainingAuthReady();
    }).catch(function() {
      window.trainingUser = null;
      if (window.onTrainingAuthReady) window.onTrainingAuthReady();
    });
  } else {
    window.trainingUser = null;
    if (window.onTrainingAuthReady) window.onTrainingAuthReady();
  }
});