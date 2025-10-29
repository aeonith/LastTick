/**
 * Authentication Module
 * Real Firebase authentication with email/password
 */

import { Platform } from 'react-native';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  FirebaseUser
} from './firebaseConfig';

export interface User {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
}

/**
 * Sign up with email and password
 */
export async function signUp(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }

    if (password.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters' };
    }

    if (!email.includes('@')) {
      return { success: false, error: 'Invalid email address' };
    }

    // For web/development with localStorage fallback
    if (Platform.OS === 'web' && auth.app.options.apiKey === 'YOUR-API-KEY') {
      const users = JSON.parse(localStorage.getItem('lasttick_users') || '{}');
      
      if (users[email]) {
        return { success: false, error: 'Email already registered' };
      }

      const user: User = {
        uid: Math.random().toString(36).substring(2),
        email,
        emailVerified: false,
        displayName: null,
      };

      users[email] = { ...user, password };
      localStorage.setItem('lasttick_users', JSON.stringify(users));
      localStorage.setItem('lasttick_current_user', JSON.stringify(user));

      return { success: true, user };
    }

    // Real Firebase authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const user: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      emailVerified: firebaseUser.emailVerified,
      displayName: firebaseUser.displayName,
    };

    return { success: true, user };
  } catch (error: any) {
    let errorMessage = 'Sign up failed';
    
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'Email already registered';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password is too weak';
    }
    
    return { success: false, error: errorMessage };
  }
}

/**
 * Log in with email and password
 */
export async function login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }

    // For web/development with localStorage fallback
    if (Platform.OS === 'web' && auth.app.options.apiKey === 'YOUR-API-KEY') {
      const users = JSON.parse(localStorage.getItem('lasttick_users') || '{}');
      const storedUser = users[email];

      if (!storedUser || storedUser.password !== password) {
        return { success: false, error: 'Invalid email or password' };
      }

      const user: User = {
        uid: storedUser.uid,
        email: storedUser.email,
        emailVerified: storedUser.emailVerified,
        displayName: storedUser.displayName,
      };

      localStorage.setItem('lasttick_current_user', JSON.stringify(user));
      return { success: true, user };
    }

    // Real Firebase authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;

    const user: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      emailVerified: firebaseUser.emailVerified,
      displayName: firebaseUser.displayName,
    };

    return { success: true, user };
  } catch (error: any) {
    let errorMessage = 'Invalid email or password';
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    }
    
    return { success: false, error: errorMessage };
  }
}

/**
 * Log out current user
 */
export async function logout(): Promise<void> {
  if (Platform.OS === 'web' && auth.app.options.apiKey === 'YOUR-API-KEY') {
    localStorage.removeItem('lasttick_current_user');
    return;
  }
  
  await signOut(auth);
}

/**
 * Get current logged in user
 */
export async function getCurrentUser(): Promise<User | null> {
  if (Platform.OS === 'web' && auth.app.options.apiKey === 'YOUR-API-KEY') {
    const userStr = localStorage.getItem('lasttick_current_user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user;
    }
    return null;
  }

  const firebaseUser = auth.currentUser;
  if (firebaseUser) {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      emailVerified: firebaseUser.emailVerified,
      displayName: firebaseUser.displayName,
    };
  }
  
  return null;
}

/**
 * Check if user is logged in
 */
export async function isLoggedIn(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}

/**
 * Send password reset email
 */
export async function resetPassword(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!email) {
      return { success: false, error: 'Email is required' };
    }

    if (Platform.OS === 'web' && auth.app.options.apiKey === 'YOUR-API-KEY') {
      const users = JSON.parse(localStorage.getItem('lasttick_users') || '{}');
      if (!users[email]) {
        return { success: false, error: 'Email not found' };
      }
      return { success: true };
    }

    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    let errorMessage = 'Failed to send reset email';
    
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    }
    
    return { success: false, error: errorMessage };
  }
}

/**
 * Listen to auth state changes
 */
export function onAuthChange(callback: (user: User | null) => void): () => void {
  if (Platform.OS === 'web' && auth.app.options.apiKey === 'YOUR-API-KEY') {
    // For localStorage mode, check periodically
    const interval = setInterval(() => {
      getCurrentUser().then(callback);
    }, 1000);
    return () => clearInterval(interval);
  }

  return onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser) {
      callback({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        emailVerified: firebaseUser.emailVerified,
        displayName: firebaseUser.displayName,
      });
    } else {
      callback(null);
    }
  });
}
