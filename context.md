# Hungarian Business — Website context

## Site

- **Live URL:** https://pinter-tamas.github.io/
- **Repo:** https://github.com/Pinter-Tamas/pintertamas.github.io
- **Local files:** `08-Hungarian_Business/03-Website/`
- **Deploy:** git push via SSH to GitHub Pages

## Structure

```
index.html                              Hub page — 5 (+1) topic cards
style.css                               Blue design
firebase-config.js                      Firebase config (KITÖLTENDŐ)
firebase-auth.js                        Auth + jogosultságkezelés
login.html                              Login oldal + password reset
admin.html                              Admin felület — user kezelés

betegsegek/index.html                   Betegségek topic + Google Form
elhizas/index.html                      Elhízás topic + Google Form
tanulas/index.html                      Tanulás topic + Google Form
munka-vallalkozas/index.html            Munka/Vállalkozás topic + Google Form
emberi-kapcsolatok/index.html           Emberi Kapcsolatok topic + Google Form

zar-tartalmak/index.html                Zárt tartalmak lista (auth-védett)
zar-tartalmak/egeszseg/index.html       Egészség zárt anyagok (auth-védett)
```

## Auth rendszer (Firebase + Firestore)

- **Firebase Authentication** (Email/Password) — bejelentkezéshez
- **Firestore Database** — user jogosultságokat tárolja
- Egyedi hozzáférés: minden usernek `allowedTopics` lista a Firestore-ban
- Témakörök: `egeszseg`, `elhizas`, `tanulas`, `munka-vallalkozas`, `emberi-kapcsolatok`
- Admin felület: `admin.html` — user létrehozás, törlés, jogosultság módosítás
- Elfelejtett jelszó: Firebase automatikus email küldés

## Használat előtt

1. Firebase Console → projekt létrehozása
2. Authentication → Email/Password bekapcsolása
3. Firestore → adatbázis létrehozása (európa régió)
4. `firebase-config.js` kitöltése a Firebase Web App adataival
5. Admin felhasználó létrehozása (Firebase Console → Authentication → Add user)
6. Első user létrehozása az admin.html-ben, vagy Firestore-ból közvetlenül

## Content source

All article text comes from `08-Hungarian_Business/02-Content/` markdown files.

## Google Form

- Form ID: `1FAIpQLSfuq4t1VTVnPyVDr6xkU88m3bCzU16lrSwvuWJqzsQeT5X-xA`
- Embedded in each subpage via iframe