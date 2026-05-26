import { Timestamp } from 'firebase/firestore';

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string;
  role: 'user' | 'admin';
  createdAt: Timestamp;
}

export interface Baby {
  id: string;
  userId: string;
  name: string;
  birthDate: Timestamp;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  vaccineHistory: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface VaccineRecord {
  id: string;
  babyId: string;
  vaccineName: string;
  vaccineDescription: string;
  scheduledDate: Timestamp;
  completedDate?: Timestamp;
  status: 'completed' | 'upcoming' | 'overdue';
  ageInMonths: number;
}

export interface VaccineGroup {
  ageInMonths: number;
  label: string;
  status: 'completed' | 'upcoming' | 'overdue';
  scheduledDate?: string;
  vaccines: VaccineItem[];
}

export interface VaccineItem {
  name: string;
  completed: boolean;
}

export interface GrowthEntry {
  label: string;
  weight: number;
  height: number;
}

export interface EducationContent {
  id: string;
  type: 'article' | 'infographic' | 'video';
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  readTime: string;
  featured: boolean;
  content: string;
  videoUrl?: string;
  createdAt: Timestamp;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizResult {
  id: string;
  userId: string;
  score: number;
  totalQuestions: number;
  completedAt: Timestamp;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  imageUrl?: string;
  timestamp: Timestamp;
  read: boolean;
}

export interface HealthProvider {
  id: string;
  name: string;
  type: 'doctor' | 'midwife' | 'puskesmas';
  specialty?: string;
  location: string;
  phone: string;
  isOnline: boolean;
  avatarUrl: string;
}

export interface NotificationSetting {
  h7Enabled: boolean;
  h1Enabled: boolean;
}

export interface AdminStats {
  totalSessions: number;
  sessionsTrend: number;
  totalBabies: number;
  immunized: number;
  notImmunized: number;
}

export interface VideoView {
  id: string;
  title: string;
  category: string;
  duration: string;
  views: number;
  thumbnailUrl: string;
}

export interface PageView {
  path: string;
  visits: number;
  duration: number;
}

export interface WeeklyScore {
  week: string;
  score: number;
}

export interface KnowledgeProgress {
  month: number;
  isCurrent: boolean;
  categories: CategoryProgress[];
}

export interface CategoryProgress {
  name: string;
  percentage: number;
}

export interface FeedbackData {
  rating: number;
  comment: string;
  userId: string;
  createdAt: Timestamp;
}
