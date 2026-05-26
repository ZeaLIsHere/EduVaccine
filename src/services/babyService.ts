import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { Baby } from '../types';

const COLLECTION = 'babies';

export async function saveBaby(baby: Omit<Baby, 'id' | 'createdAt' | 'updatedAt'>): Promise<Baby> {
  try {
    const docRef = doc(collection(db, COLLECTION));
    const now = Timestamp.now();
    const babyData: Baby = {
      ...baby,
      id: docRef.id,
      createdAt: now,
      updatedAt: now,
    };
    await setDoc(docRef, babyData);
    return babyData;
  } catch (error) {
    throw new Error('Gagal menyimpan data bayi.');
  }
}

export async function getBaby(babyId: string): Promise<Baby | null> {
  try {
    const docSnap = await getDoc(doc(db, COLLECTION, babyId));
    if (docSnap.exists()) {
      return docSnap.data() as Baby;
    }
    return null;
  } catch (error) {
    throw new Error('Gagal mengambil data bayi.');
  }
}

export async function getBabiesByUser(userId: string): Promise<Baby[]> {
  try {
    const q = query(collection(db, COLLECTION), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data() as Baby);
  } catch (error) {
    throw new Error('Gagal mengambil daftar bayi.');
  }
}

export async function updateBaby(
  babyId: string,
  updates: Partial<Baby>
): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTION, babyId), {
      ...updates,
      updatedAt: Timestamp.now(),
    });
  } catch (error) {
    throw new Error('Gagal memperbarui data bayi.');
  }
}
