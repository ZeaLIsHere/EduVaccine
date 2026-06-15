# eduVaccin 👶💉
**Health-Baby-Edu-Vaccin (eduVaccin)** adalah aplikasi mobile React Native yang kaya fitur dan premium, dibangun dengan **Expo SDK 54**, dirancang untuk membantu para orang tua dalam mengelola, memantau, dan memprediksi jadwal vaksinasi bayi mereka.

Aplikasi ini menggabungkan prediksi otomatis jadwal imunisasi nasional, dashboard dinamis orang tua-bayi, pelacak tumbuh kembang anak, sumber edukasi kesehatan (artikel, integrasi video, kuis), serta kemampuan telekonsultasi interaktif dengan sinkronisasi status berbasis Firebase secara real-time.

---

## ✨ Fitur Utama

1. **Dashboard (Beranda)**
   - Ringkasan profil dan status bayi.
   - Pintasan akses cepat ke fitur-fitur utama.
   - Timeline cerdas untuk jadwal vaksin mendatang.
   - Grafik metrik pertumbuhan (berat badan, tinggi badan, lingkar kepala).

2. **Profil Bayi (Profil Bayi & Prediksi Jadwal)**
   - Tambah/kelola profil anak (Nama, Jenis Kelamin, Tanggal Lahir).
   - Menghasilkan rencana imunisasi otomatis yang sepenuhnya dinamis berdasarkan Jadwal Imunisasi Nasional Indonesia.
   - Kalkulasi usia secara real-time.

3. **Pusat Edukasi**
   - Artikel terkurasi seputar parenting dan imunisasi.
   - Pusat video dengan pelacakan pemutaran inline.
   - Kuis interaktif (post-test) untuk memperkuat pengetahuan pengasuhan anak dengan papan skor dinamis.

4. **Pengingat Imunisasi (Kalender & Pengingat)**
   - Antarmuka kalender lengkap yang memetakan vaksinasi masa lalu dan mendatang.
   - Notifikasi bawaan yang dijadwalkan pada H-7 dan H-1 agar tidak ada vaksin yang terlewat.

5. **Pemantauan & Catatan (Pemantauan Tumbuh Kembang & Jurnal)**
   - Catat pengukuran tumbuh kembang (Berat Badan, Tinggi Badan, Lingkar Kepala).
   - Catatan jurnal kesehatan dinamis untuk merekam suhu, gejala, atau reaksi pasca-vaksinasi.

6. **Konsultasi & Info Kesehatan (Direktori Telekonsultasi)**
   - Simulator chat interaktif yang menghubungkan orang tua dengan dokter anak dan tenaga kesehatan bersertifikat.
   - Direktori terintegrasi yang menampilkan klinik, rumah sakit, dan praktisi medis terdekat.

7. **Report & Analisis (Analitik Orang Tua & Panel Admin)**
   - Dashboard pengguna yang mendetail dengan visualisasi data yang kaya (donut chart untuk tingkat penyelesaian, bar chart untuk pertumbuhan bulanan).
   - **Dashboard Admin** komprehensif yang memungkinkan pengguna administratif melihat statistik penggunaan total, video paling banyak ditonton, metrik imunisasi real-time, dan umpan balik pelanggan.

---

## 🛠️ Tech Stack

- **Framework**: Expo SDK 54 (dengan navigasi berbasis file Expo Router)
- **Bahasa**: TypeScript
- **Styling**: NativeWind v4 (Tailwind CSS yang dioptimalkan untuk React Native)
- **Tipografi**: Poppins (Judul/Heading) dan Work Sans (Isi/Teks)
- **Database & Auth**: Firebase v11 (Firestore, Firebase Auth, Firebase Storage)
- **State Management**: Zustand (store per domain yang berperforma tinggi dan terisolasi)
- **Arsitektur UI**: Sistem desain grid responsif kustom dengan `@expo/vector-icons` dan grafik berbasis SVG.

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

### 1. Prasyarat
Pastikan hal-hal berikut sudah terinstal di sistem Anda:
- **Node.js** (v18.x atau lebih baru direkomendasikan)
- **npm** (sudah termasuk bersama Node.js)
- **Git** (untuk version control)
- Aplikasi **Expo Go** yang sudah terinstal di perangkat mobile fisik Anda (Android/iOS) ATAU sebuah **Emulator** (Android Studio / Xcode Simulator).

---

### 2. Langkah Instalasi

1. **Clone repositori dan navigasikan ke direktori proyek:**
   ```bash
   cd EduVaccine
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Siapkan Environment Variables:**
   - Temukan file `.env.example` di direktori root.
   - Buat salinan dengan nama `.env`:
     ```bash
     cp .env.example .env
     ```
   - Buka `.env` dan isi kunci konfigurasi Firebase Anda:
     ```env
     EXPO_PUBLIC_FIREBASE_API_KEY=api_key_firebase_anda
     EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=project_anda.firebaseapp.com
     EXPO_PUBLIC_FIREBASE_PROJECT_ID=id_project_anda
     EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=project_anda.appspot.com
     EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=sender_id_anda
     EXPO_PUBLIC_FIREBASE_APP_ID=app_id_anda
     EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=measurement_id_anda
     ```

---

### 3. Menjalankan Aplikasi

Jalankan perintah berikut di folder root untuk memulai server developer Expo:

```bash
npm start
```

Atau Anda bisa menggunakan:
```bash
npx expo start
```

Ini akan menjalankan Expo Metro Bundler. Sebuah QR code akan muncul di terminal Anda.

#### Menjalankan di Perangkat Fisik:
1. Hubungkan ponsel Anda ke jaringan Wi-Fi yang sama dengan komputer.
2. Install aplikasi **Expo Go** dari App Store (iOS) atau Google Play Store (Android).
3. **Android**: Scan QR code yang ditampilkan di terminal menggunakan pemindai bawaan Expo Go.
4. **iOS**: Scan QR code menggunakan aplikasi kamera bawaan, yang akan meminta Anda untuk membuka proyek di Expo Go.

#### Menjalankan di Emulator:
- Tekan **`a`** di terminal untuk menjalankan aplikasi di Android Emulator.
- Tekan **`i`** di terminal untuk menjalankan aplikasi di iOS Simulator (hanya macOS).
- Tekan **`w`** untuk menjalankan aplikasi langsung di browser web.

---

## 📂 Struktur Proyek

```
EduVaccine/
├── app/                          # Halaman & layout berbasis file Expo Router
│   ├── _layout.tsx               # Layout root (menangani font, provider, splash screen)
│   ├── (tabs)/                   # Grup tab navigasi utama
│   │   ├── _layout.tsx           # Kustomisasi dan konfigurasi tab bar
│   │   ├── index.tsx             # Dashboard / Beranda
│   │   ├── edukasi.tsx           # Pusat Edukasi
│   │   ├── kalender.tsx          # Pengingat Imunisasi (Kalender/Jadwal)
│   │   └── profil.tsx            # Profil Bayi (Manajemen Profil)
│   ├── konsultasi/               # Grup routing Konsultasi
│   │   ├── _layout.tsx           # Layout stack konsultasi
│   │   ├── index.tsx             # Direktori Dokter
│   │   └── chat.tsx              # Layar Chat Interaktif
│   ├── pemantauan.tsx            # Pemantauan Tumbuh Kembang & Catatan
│   ├── report.tsx                # Report & Analisis (Analitik Pengguna)
│   ├── admin.tsx                 # Panel Kontrol Admin
│   ├── quiz.tsx                  # Kuis Post-test Interaktif
│   └── feedback.tsx              # Formulir Umpan Balik Pengguna
├── src/                          # Sumber Aplikasi Bersama
│   ├── components/               # Komponen UI Kustom
│   │   ├── ui/                   # Elemen Primitif yang Dapat Digunakan Ulang (Card, Button, Input)
│   │   └── charts/               # Grafik Kustom Dinamis (Donut, Bar, Line)
│   ├── constants/                # Konfigurasi warna, layout, dan jadwal vaksin
│   ├── services/                 # Lapisan integrasi Database & Firebase
│   ├── stores/                   # Store global Zustand (Auth, Baby, Notifications, dll.)
│   ├── types/                    # Definisi tipe TypeScript umum
│   └── utils/                    # Helper tanggal, usia, dan jadwal imunisasi
├── assets/                       # Media statis dan font
│   └── fonts/                    # File font TTF (Poppins, Work Sans)
├── tailwind.config.js            # Token desain styling Tailwind
├── babel.config.js               # Konfigurasi compiler Metro
└── package.json                  # Paket dan konfigurasi NPM
```

---

## 🛠️ Perintah NPM Utama

| Perintah | Fungsi |
| :--- | :--- |
| `npm start` | Menjalankan server Expo Metro bundler |
| `npm run android` | Memulai Metro bundler dan mencoba menjalankan di Emulator/Perangkat Android yang terhubung |
| `npm run ios` | Memulai Metro bundler dan mencoba menjalankan di iOS Simulator |
| `npm run web` | Menjalankan proyek di browser web |
| `npx tsc --noEmit` | Melakukan pengecekan TypeScript statis secara menyeluruh untuk memverifikasi tidak adanya error |

---

## 🤝 Panduan Desain & Kode Proyek

- **Zero-Inline Comments**: Agar memenuhi standar produksi, jaga kode sumber tetap bersih dan mudah dibaca tanpa menulis komentar inline yang tidak perlu.
- **Type Safety**: Hindari penggunaan `any` secara ketat. Gunakan skema dan tipe yang dideklarasikan di `src/types/`.
- **Styling**: Selalu tulis kelas layout menggunakan pola utilitas NativeWind yang sesuai dengan palet HSL modern. Hindari hardcode margin/padding native jika memungkinkan.
- **State Flow**: Komponen harus mengandalkan hook Zustand (misalnya `useBabyStore`, `useAuthStore`) untuk membaca dan memodifikasi state. Setiap persistensi harus disinkronkan melalui lapisan `src/services/`.

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah Lisensi MIT - lihat file [LICENSE](LICENSE) untuk detailnya.
