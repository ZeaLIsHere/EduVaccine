import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { ChatMessage, HealthProvider } from '../types';

const MESSAGES_COLLECTION = 'chatMessages';
const PROVIDERS_COLLECTION = 'healthProviders';

export async function sendMessage(
  message: Omit<ChatMessage, 'id' | 'timestamp' | 'read'>
): Promise<ChatMessage> {
  try {
    const docRef = doc(collection(db, MESSAGES_COLLECTION));
    const data: ChatMessage = {
      ...message,
      id: docRef.id,
      timestamp: Timestamp.now(),
      read: false,
    };
    await setDoc(docRef, data);
    return data;
  } catch (error) {
    throw new Error('Gagal mengirim pesan.');
  }
}

export function subscribeToMessages(
  senderId: string,
  receiverId: string,
  callback: (messages: ChatMessage[]) => void
): () => void {
  const q = query(
    collection(db, MESSAGES_COLLECTION),
    where('senderId', 'in', [senderId, receiverId]),
    orderBy('timestamp', 'asc')
  );

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs
      .map((d) => d.data() as ChatMessage)
      .filter(
        (m) =>
          (m.senderId === senderId && m.receiverId === receiverId) ||
          (m.senderId === receiverId && m.receiverId === senderId)
      );
    callback(messages);
  });
}

export async function getHealthProviders(
  type?: 'doctor' | 'midwife' | 'puskesmas'
): Promise<HealthProvider[]> {
  try {
    let q;
    if (type) {
      q = query(
        collection(db, PROVIDERS_COLLECTION),
        where('type', '==', type)
      );
    } else {
      q = query(collection(db, PROVIDERS_COLLECTION));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data() as HealthProvider);
  } catch (error) {
    throw new Error('Gagal mengambil data tenaga kesehatan.');
  }
}
