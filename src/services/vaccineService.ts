import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { VaccineRecord } from '../types';

const COLLECTION = 'vaccineRecords';

export async function saveVaccineRecord(
  record: Omit<VaccineRecord, 'id'>
): Promise<VaccineRecord> {
  try {
    const docRef = doc(collection(db, COLLECTION));
    const data: VaccineRecord = { ...record, id: docRef.id };
    await setDoc(docRef, data);
    return data;
  } catch (error) {
    throw new Error('Gagal menyimpan catatan vaksin.');
  }
}

export async function getVaccineRecords(babyId: string): Promise<VaccineRecord[]> {
  try {
    const q = query(
      collection(db, COLLECTION),
      where('babyId', '==', babyId),
      orderBy('ageInMonths', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data() as VaccineRecord);
  } catch (error) {
    throw new Error('Gagal mengambil catatan vaksin.');
  }
}

export async function markVaccineComplete(
  recordId: string
): Promise<void> {
  try {
    await updateDoc(doc(db, COLLECTION, recordId), {
      status: 'completed',
      completedDate: Timestamp.now(),
    });
  } catch (error) {
    throw new Error('Gagal menandai vaksin selesai.');
  }
}

export async function getUpcomingVaccineRecords(
  babyId: string
): Promise<VaccineRecord[]> {
  try {
    const q = query(
      collection(db, COLLECTION),
      where('babyId', '==', babyId),
      where('status', 'in', ['upcoming', 'overdue']),
      orderBy('scheduledDate', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data() as VaccineRecord);
  } catch (error) {
    throw new Error('Gagal mengambil jadwal vaksin.');
  }
}
