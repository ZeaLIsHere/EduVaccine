import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  doc,
  setDoc,
  Timestamp,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';
import { EducationContent, EducationContentDetail, QuizQuestion, QuizResult } from '../types';

const ARTICLES_COLLECTION = 'educationContent';
const QUIZZES_COLLECTION = 'quizzes';
const RESULTS_COLLECTION = 'quizResults';

const DEFAULT_PAGE_SIZE = 10;

export interface PaginatedResult<T> {
  items: T[];
  lastDoc: QueryDocumentSnapshot | null;
  hasMore: boolean;
}

export async function getEducationContent(
  type?: 'article' | 'infographic' | 'video',
  pageSize: number = DEFAULT_PAGE_SIZE,
  lastDoc?: QueryDocumentSnapshot | null
): Promise<PaginatedResult<EducationContent>> {
  try {
    const constraints = [
      ...(type ? [where('type', '==', type)] : []),
      orderBy('createdAt', 'desc'),
      limit(pageSize + 1),
      ...(lastDoc ? [startAfter(lastDoc)] : []),
    ];

    const q = query(collection(db, ARTICLES_COLLECTION), ...constraints);
    const snapshot = await getDocs(q);
    const docs = snapshot.docs;

    const hasMore = docs.length > pageSize;
    const items = docs
      .slice(0, pageSize)
      .map((d) => {
        const data = d.data();
        const { content: _content, ...metadata } = data;
        return metadata as EducationContent;
      });

    return {
      items,
      lastDoc: items.length > 0 ? docs[items.length - 1] : null,
      hasMore,
    };
  } catch (error) {
    throw new Error('Gagal mengambil konten edukasi.');
  }
}

export async function getEducationContentById(id: string): Promise<EducationContentDetail | null> {
  try {
    const docRef = doc(db, ARTICLES_COLLECTION, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return snapshot.data() as EducationContentDetail;
  } catch (error) {
    throw new Error('Gagal mengambil detail konten.');
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
      const data = snapshot.docs[0].data();
      const { content: _content, ...metadata } = data;
      return metadata as EducationContent;
    }
    return null;
  } catch (error) {
    throw new Error('Gagal mengambil konten unggulan.');
  }
}

export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  try {
    const q = query(collection(db, QUIZZES_COLLECTION), limit(20));
    const snapshot = await getDocs(q);
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
      orderBy('completedAt', 'desc'),
      limit(20)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => d.data() as QuizResult);
  } catch (error) {
    throw new Error('Gagal mengambil hasil kuis.');
  }
}
