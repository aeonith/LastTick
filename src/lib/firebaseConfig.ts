/**
 * Firebase Configuration
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com
 * 2. Create new project: "LastTick"
 * 3. Add web app
 * 4. Copy config values and paste below
 * 5. Enable Authentication → Email/Password in Firebase Console
 * 
 * For iOS:
 * - Add iOS app with bundle ID: com.yourcompany.lasttick
 * - Download GoogleService-Info.plist
 * 
 * For Android:
 * - Add Android app with package: com.yourcompany.lasttick
 * - Download google-services.json
 */

import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  Auth,
  User as FirebaseUser
} from 'firebase/auth';

// TODO: Replace with your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-PROJECT.firebaseapp.com",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-PROJECT.appspot.com",
  messagingSenderId: "YOUR-SENDER-ID",
  appId: "YOUR-APP-ID"
};

let app: FirebaseApp;
let auth: Auth;

// Initialize Firebase only once
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} else {
  app = getApps()[0];
  auth = getAuth(app);
}

export { auth };
export type { FirebaseUser };
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged
};
