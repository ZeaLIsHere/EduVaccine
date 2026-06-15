// Script untuk seed data video ke Firestore
// Jalankan dengan: node scripts/seedEducation.js

const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc, Timestamp } = require('firebase/firestore');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const COLLECTION = 'educationContent';

const videos = [
  {
    id: 'video-001',
    type: 'video',
    title: 'Video Edukasi Imunisasi Bayi',
    description: 'Panduan edukasi lengkap seputar imunisasi dan kesehatan bayi untuk para orang tua.',
    videoId: 'ziKujLMGQeE',
    videoDuration: '',
    category: 'Imunisasi',
    featured: false,
    createdAt: Timestamp.now(),
  },
];

const articles = [
  {
    id: 'article-001',
    type: 'article',
    title: 'Panduan Lengkap Manfaat Vaksin',
    description: 'Pahami bagaimana vaksin membangun sistem kekebalan tubuh bayi Anda.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400',
    category: 'Imunisasi',
    readTime: 'Baca 5 menit',
    featured: true,
    content: 'Vaksin adalah salah satu pencapaian terbesar dalam dunia kedokteran modern. Dengan memberikan vaksin kepada bayi, kita membantu sistem kekebalan tubuh mereka mengenali dan melawan penyakit berbahaya...',
    createdAt: Timestamp.now(),
  },
  {
    id: 'article-002',
    type: 'article',
    title: 'Mengelola Efek Samping Pasca Vaksinasi',
    description: 'Apa yang diharapkan setelah suntikan dan cara menenangkan bayi Anda.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    category: 'Panduan',
    readTime: 'Baca 4 menit',
    featured: false,
    content: 'Setelah vaksinasi, bayi mungkin mengalami beberapa efek samping ringan yang merupakan tanda sistem kekebalan tubuh sedang bekerja...',
    createdAt: Timestamp.now(),
  },
  {
    id: 'article-003',
    type: 'article',
    title: 'Pencegahan Infeksi pada Bayi',
    description: 'Kebiasaan sehari-hari untuk menjaga kesehatan bayi.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400',
    category: 'Edukasi',
    readTime: 'Baca 3 menit',
    featured: false,
    content: 'Menjaga kebersihan lingkungan dan kebiasaan hidup sehat adalah kunci untuk mencegah infeksi pada bayi...',
    createdAt: Timestamp.now(),
  },
];

async function seed() {
  console.log('🔥 Menghubungkan ke Firebase...');
  console.log(`   Project: ${firebaseConfig.projectId}`);
  console.log('');

  try {
    console.log('📝 Memasukkan artikel...');
    for (const article of articles) {
      await setDoc(doc(db, COLLECTION, article.id), article);
      console.log(`   ✅ ${article.title}`);
    }

    console.log('');
    console.log('🎬 Memasukkan video...');
    for (const video of videos) {
      await setDoc(doc(db, COLLECTION, video.id), video);
      console.log(`   ✅ ${video.title} (YouTube: ${video.videoId})`);
    }

    console.log('');
    console.log('🎉 Selesai! Semua konten berhasil dimasukkan ke Firestore.');
    console.log(`   Koleksi: ${COLLECTION}`);
    console.log(`   Total: ${articles.length} artikel + ${videos.length} video`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seed();
