# eduVaccin 👶💉
**Health-Baby-Edu-Vaccin (eduVaccin)** is a premium, feature-rich React Native mobile application built with **Expo SDK 54**, designed to assist parents in managing, tracking, and predicting their babies' vaccination schedules.

The app combines advanced automated prediction of national immunization schedules, a dynamic parent-baby dashboard, child growth trackers, health educational resources (articles, video integration, quizzes), and interactive teleconsultation capabilities with real-time Firebase-driven state synchronization.

---

## ✨ Key Features

1. **Dashboard (Home Screen)**
   - Overview of baby profile and status.
   - Quick-access shortcuts to key features.
   - Smart timeline for upcoming vaccine schedules.
   - Growth metrics charts (weight, height, head circumference).

2. **Profil Bayi (Baby Profile & Predictive Schedule)**
   - Add/manage child profiles (Name, Gender, Date of Birth).
   - Generates an automated, fully dynamic immunization plan based on the Indonesian National Immunization Schedule.
   - Real-time age calculations.

3. **Pusat Edukasi (Education Hub)**
   - Curated articles on parenting and immunization.
   - Video center with inline playback tracking.
   - Interactive quizzes (post-tests) to reinforce child care knowledge with dynamic scoreboards.

4. **Pengingat Imunisasi (Calendar & Reminders)**
   - Full calendar interface mapping out past and future vaccinations.
   - Built-in notifications scheduled at H-7 and H-1 to ensure no vaccine is missed.

5. **Pemantauan & Catatan (Growth Monitoring & Journal)**
   - Log growth measurements (Weight, Height, Head Circumference).
   - Dynamic health journal notes to record temperature, symptoms, or reactions post-vaccination.

6. **Konsultasi & Info Kesehatan (Teleconsultation Directory)**
   - Interactive chat simulator connecting parents with certified pediatricians and health workers.
   - Integrated directory listing nearby clinics, hospitals, and medical practitioners.

7. **Report & Analisis (Parent Analytics & Admin Panel)**
   - Detailed user dashboard with rich data visualizations (donut charts for completion rates, bar charts for monthly developmental growth).
   - Comprehensive **Admin Dashboard** allowing administrative users to view total usage statistics, most-watched videos, real-time immunization metrics, and customer feedback.

---

## 🛠️ Tech Stack

- **Framework**: Expo SDK 54 (with Expo Router file-based navigation)
- **Language**: TypeScript
- **Styling**: NativeWind v4 (Tailwind CSS styled for React Native)
- **Typography**: Poppins (Headings/Titles) and Work Sans (Body/Texts)
- **Database & Auth**: Firebase v11 (Firestore, Firebase Auth, Firebase Storage)
- **State Management**: Zustand (highly performant, isolated domain stores)
- **UI Architecture**: Custom responsive grid design system with `@expo/vector-icons` and SVG-based charts.

---

## 🚀 How to Run the Project Locally

### 1. Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v18.x or newer recommended)
- **npm** (comes packaged with Node.js)
- **Git** (for version control)
- **Expo Go** app installed on your physical mobile device (Android/iOS) OR an **Emulator** (Android Studio / Xcode Simulator).

---

### 2. Installation Steps

1. **Clone the repository and navigate to the project directory:**
   ```bash
   cd EduVaccine
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   - Locate the `.env.example` file in the root directory.
   - Create a copy named `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and fill in your Firebase configuration keys:
     ```env
     EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
     EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
     EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
     EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
     EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
     ```

---

### 3. Running the App

Run the following command in the root folder to start the Expo developer server:

```bash
npm start
```

Or you can use:
```bash
npx expo start
```

This will spin up the Expo Metro Bundler. You will see a QR code generated in your terminal.

#### Running on a Physical Device:
1. Connect your phone to the same Wi-Fi network as your computer.
2. Install the **Expo Go** app from the App Store (iOS) or Google Play Store (Android).
3. **Android**: Scan the QR code shown in the terminal using the Expo Go built-in scanner.
4. **iOS**: Scan the QR code using your default camera app, which will prompt you to open the project in Expo Go.

#### Running on an Emulator:
- Press **`a`** in your terminal to launch the app on an Android Emulator.
- Press **`i`** in your terminal to launch the app on an iOS Simulator (macOS only).
- Press **`w`** to run the application directly in your web browser.

---

## 📂 Project Structure

```
EduVaccine/
├── app/                          # Expo Router file-based pages & layouts
│   ├── _layout.tsx               # Root layout (handles fonts, providers, splash screens)
│   ├── (tabs)/                   # Main navigation tabs group
│   │   ├── _layout.tsx           # Tab bar customization and config
│   │   ├── index.tsx             # Dashboard / Home Screen
│   │   ├── edukasi.tsx           # Pusat Edukasi (Education Hub)
│   │   ├── kalender.tsx          # Pengingat Imunisasi (Calendar/Schedule)
│   │   └── profil.tsx            # Profil Bayi (Baby Profile Management)
│   ├── konsultasi/               # Consultations routing group
│   │   ├── _layout.tsx           # Consultation stack layout
│   │   ├── index.tsx             # Doctor Directory
│   │   └── chat.tsx              # Interactive Chat screen
│   ├── pemantauan.tsx            # Growth Monitoring & Catatan
│   ├── report.tsx                # Report & Analisis (User Analytics)
│   ├── admin.tsx                 # Admin Control Panel
│   ├── quiz.tsx                  # Post-test Interactive Quizzes
│   └── feedback.tsx              # User Feedback forms
├── src/                          # Shared Application Source
│   ├── components/               # Custom UI Components
│   │   ├── ui/                   # Reusable Primitive Elements (Cards, Buttons, Inputs)
│   │   └── charts/               # Dynamic Custom Charts (Donut, Bar, Line)
│   ├── constants/                # Colors, Layouts, Vaccine schedule configurations
│   ├── services/                 # Database & Firebase integration layer
│   ├── stores/                   # Zustand global stores (Auth, Baby, Notifications, etc.)
│   ├── types/                    # Common TypeScript type definitions
│   └── utils/                    # Dates, ages, and immunization scheduler helpers
├── assets/                       # Static media and fonts
│   └── fonts/                    # TTF Font files (Poppins, Work Sans)
├── tailwind.config.js            # Tailwind styling design tokens
├── babel.config.js               # Metro compiler configuration
└── package.json                  # NPM packages and configurations
```

---

## 🛠️ Main NPM Commands

| Command | Purpose |
| :--- | :--- |
| `npm start` | Launches the Expo Metro bundler server |
| `npm run android` | Starts Metro bundler and attempts to launch in connected Android Emulator / Device |
| `npm run ios` | Starts Metro bundler and attempts to launch in iOS Simulator |
| `npm run web` | Launches the project in a web browser |
| `npx tsc --noEmit` | Performs comprehensive static TypeScript checking to verify lack of errors |

---

## 🤝 Project Design & Code Guidelines

- **Zero-Inline Comments**: To match production requirements, keep the source code clean and readable without writing unnecessary inline comments.
- **Type Safety**: Strictly avoid using `any`. Make use of the schemas and types declared in `src/types/`.
- **Styling**: Always write layout classes using NativeWind's utility patterns matching modern HSL palettes. Avoid hardcoding native margins/paddings when possible.
- **State Flow**: Components should rely on Zustand hooks (e.g., `useBabyStore`, `useAuthStore`) to read and modify states. Any persistence must synchronize through the `src/services/` layer.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](file:///e:/EduVaccine/LICENSE) file for details.
