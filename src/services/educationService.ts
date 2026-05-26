import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  doc,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { EducationContent, QuizQuestion, QuizResult } from '../types';

const ARTICLES_COLLECTION = 'educationContent';
const QUIZZES_COLLECTION = 'quizzes';
const RESULTS_COLLECTION = 'quizResults';

export async function getEducationContent(
  type?: 'article' | 'infographic' | 'video'
): Promise<EducationContent[]> {
  try {
    let q;
    if (type) {
      q = query(
        collection(db, ARTICLES_COLLECTION),
        where('type', '==', type),
        orderBy('createdAt', 'desc')
      );
    } else {
      q = query(
        collection(db, ARTICLES_COLLECTION),
        orderBy('createdAt', 'desc')
      );
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data() as EducationContent);
  } catch (error) {
    throw new Error('Gagal mengambil konten edukasi.');
  }
}

export async function getFeaturedContent(): Promise<EducationContent | null> {
  try {
    const q = query(
      collection(db, ARTICLES_COLLECTION),
      where('featured', '==', true),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (snapshot.docs.length > 0) {
      return snapshot.docs[0].data() as EducationContent;
    }
    return null;
  } catch (error) {
    throw new Error('Gagal mengambil konten unggulan.');
  }
}

export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  try {
    const snapshot = await getDocs(collection(db, QUIZZES_COLLECTION));
    return snapshot.docs.map((d) => d.data() as QuizQuestion);
  } catch (error) {
    throw new Error('Gagal mengambil soal kuis.');
  }
}

export async function submitQuizResult(
  userId: string,
  score: number,
  totalQuestions: number
): Promise<QuizResult> {
  try {
    const docRef = doc(collection(db, RESULTS_COLLECTION));
    const result: QuizResult = {
      id: docRef.id,
      userId,
      score,
      totalQuestions,
      completedAt: Timestamp.now(),
    };
    await setDoc(docRef, result);
    return result;
  } catch (error) {
    throw new Error('Gagal menyimpan hasil kuis.');
  }
}

export async function getQuizResults(userId: string): Promise<QuizResult[]> {
  try {
    const q = query(
      collection(db, RESULTS_COLLECTION),
      where('userId', '==', userId),
      orderBy('completedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data() as QuizResult);
  } catch (error) {
    throw new Error('Gagal mengambil hasil kuis.');
  }
}
