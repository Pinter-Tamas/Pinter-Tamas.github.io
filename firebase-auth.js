// Firebase hitelesítés + jogosultságkezelés
// Globális változók
let currentUser = null;
let userTopics = [];

// Ellenőrzi, hogy be van-e jelentkezve
function checkAuthState() {
  return new Promise((resolve) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        currentUser = user;
        await loadUserTopics(user.uid);
        updateUI();
        resolve(true);
      } else {
        currentUser = null;
        userTopics = [];
        updateUI();
        resolve(false);
      }
    });
  });
}

// Betölti a user jogosultságait a Firestore-ból
async function loadUserTopics(uid) {
  try {
    const doc = await db.collection('users').doc(uid).get();
    if (doc.exists) {
      userTopics = doc.data().allowedTopics || [];
    } else {
      // Ha nincs Firestore rekord, akkor nincs hozzáférés
      userTopics = [];
    }
  } catch (error) {
    console.error('Hiba a jogosultságok betöltésekor:', error);
    userTopics = [];
  }
}

// Bejelentkezés
async function login(email, password) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    return { success: true };
  } catch (error) {
    let message = 'Hiba történt a bejelentkezéskor.';
    if (error.code === 'auth/user-not-found') message = 'Nincs ilyen felhasználó.';
    if (error.code === 'auth/wrong-password') message = 'Hibás jelszó.';
    if (error.code === 'auth/invalid-email') message = 'Érvénytelen email cím.';
    if (error.code === 'auth/too-many-requests') message = 'Túl sok hibás próbálkozás. Kérlek, várj egy kicsit.';
    if (error.code === 'auth/invalid-credential') message = 'Hibás email vagy jelszó.';
    return { success: false, message };
  }
}

// Bejelentkezési állapot ellenőrzése egy adott témakörhöz
function hasAccess(topic) {
  if (!currentUser) return false;
  return userTopics.includes(topic);
}

// Kilépés
async function logout() {
  try {
    await auth.signOut();
    window.location.href = '/login.html';
  } catch (error) {
    console.error('Hiba a kilépéskor:', error);
  }
}

// UI frissítése
function updateUI() {
  // Fejléc login státusz
  const loginBadge = document.getElementById('login-badge');
  if (!loginBadge) return;

  if (currentUser) {
    loginBadge.innerHTML = `
      <span class="login-user-name">${currentUser.displayName || currentUser.email}</span>
      <button onclick="logout()" class="btn-logout">Kilépés</button>
    `;
  } else {
    loginBadge.innerHTML = ``;
  }
}

// Zárt tartalom ellenőrzése
function requireAuth(topic) {
  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.pathname);
      return;
    }
    await loadUserTopics(user.uid);
    if (!userTopics.includes(topic)) {
      document.getElementById('auth-message').innerHTML = `
        <div class="no-access">
          <h2>🔒 Nincs hozzáférésed</h2>
          <p>Ehhez a tartalomhoz nincs jogosultságod.</p>
          <a href="/" class="btn-link">Vissza a főoldalra</a>
        </div>
      `;
      return;
    }
    document.getElementById('auth-message').style.display = 'none';
    document.getElementById('protected-content').style.display = 'block';
  });
}

// Firebase SDK betöltése után hívjuk
document.addEventListener('DOMContentLoaded', function() {
  checkAuthState();
});