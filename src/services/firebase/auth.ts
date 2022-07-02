import { auth } from '.';
import {
  // Email & Password
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // Google
  GoogleAuthProvider,
  signInWithRedirect,
  // Sign Out
  signOut,
} from 'firebase/auth';

// Email & Password Register
export const emailRegister = async (email: string, password: string) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.code };
  }
};

// Email & Password Login
export const emailLogin = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.code };
  }
};

// Google Login
export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();

  await signInWithRedirect(auth, provider);
};

// Logout
export const logout = async () => {
  await signOut(auth);
};
