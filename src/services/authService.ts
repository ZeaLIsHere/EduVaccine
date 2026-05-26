import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import { User } from '../types';

export async function signIn(email: string, password: string): Promise<User> {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', credential.user.uid));
    if (userDoc.exists()) {
      return { id: credential.user.uid, ...userDoc.data() } as User;
    }
    return {
      id: credential.user.uid,
      email: credential.user.email || '',
      displayName: credential.user.displayName || '',
      avatarUrl: '',
      role: 'user',
      createdAt: Timestamp.now(),
    };
  } catch (error) {
    throw new Error('Login gagal. Periksa email dan password Anda.');
  }
}

export async function signUp(
  email: string,
  password: string,
  displayName: string
): Promise<User> {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    const userData: User = {
      id: credential.user.uid,
      email,
      displayName,
      avatarUrl: '',
      role: 'user',
      createdAt: Timestamp.now(),
    };
    await setDoc(doc(db, 'users', credential.user.uid), userData);
    return userData;
  } catch (error) {
    throw new Error('Pendaftaran gagal. Coba lagi.');
  }
}

export async function signOut(): Promise<void> {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    throw new Error('Logout gagal.');
  }
}

export function onAuthChange(callback: (user: FirebaseUser | null) => void): () => void {
  return onAuthStateChanged(auth, callback);
}

export async function getUserProfile(userId: string): Promise<User | null> {
  try {
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return { id: userId, ...userDoc.data() } as User;
    }
    return null;
  } catch (error) {
    throw new Error('Gagal mengambil profil pengguna.');
  }
}
