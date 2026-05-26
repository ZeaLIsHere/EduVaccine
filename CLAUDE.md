# CLAUDE.md — EduVaccine

---

## 1. Project Overview

- Name        : eduVaccine
- Description : Mobile app for baby immunization tracking, education, and health consultation
- Goal        : Help parents track vaccination schedules, learn about immunization, and connect with healthcare providers
- Target Users: Parents/caregivers of babies aged 0-24 months in Indonesia
- Version     : v1.0.0
- Status      : Active development

---

## 2. Tech Stack

- Language         : TypeScript
- Framework        : Expo SDK 56 + Expo Router (file-based navigation)
- Styling          : NativeWind v4 (Tailwind CSS for React Native)
- UI Library       : Custom components + @expo/vector-icons
- Database         : Firebase (Firestore + Auth + Storage)
- Auth             : Firebase Auth (email/password)
- State Management : Zustand (one store per domain)
- Data Fetching    : Firebase SDK direct calls via service layer
- Package Manager  : npm
- Deployment       : Expo Go / EAS Build

---

## 3. Commands

```bash
npm start           # Start Expo dev server
npm run dev          # Start with dev client
npm run android      # Start on Android
npm run ios          # Start on iOS
npm run web          # Start on web
npx tsc --noEmit     # TypeScript type check
```

---

## 4. Project Structure

Architecture: Feature-based with shared services

```
EduVaccine/
  app/                          # Expo Router file-based routes
    _layout.tsx                 # Root layout (fonts, providers, splash)
    (tabs)/                     # Tab navigator group
      _layout.tsx               # Tab bar config
      index.tsx                 # Dashboard (Home)
      edukasi.tsx               # Pusat Edukasi
      kalender.tsx              # Pengingat Imunisasi
      profil.tsx                # Profil Bayi
    konsultasi/                 # Konsultasi stack
      _layout.tsx               # Stack layout
      index.tsx                 # Info & Direktori
      chat.tsx                  # Chat with doctor
    pemantauan.tsx              # Pemantauan & Catatan
    report.tsx                  # Report & Analisis
    admin.tsx                   # Admin Panel
    quiz.tsx                    # Post-test quiz
    feedback.tsx                # Feedback form
  src/
    components/
      ui/                       # Reusable UI primitives
      charts/                   # Chart components (Donut, Bar, Line)
    stores/                     # Zustand stores (per domain)
    services/                   # Firebase service layer
    types/                      # TypeScript interfaces
    constants/                  # Colors, vaccine data
    utils/                      # Date and vaccine schedule utilities
  assets/
    fonts/                      # Poppins + Work Sans TTF files
```

File placement rules:
- UI components in src/components/ui/
- Business logic in src/services/ and src/stores/
- TypeScript types in src/types/
- Helpers and utilities in src/utils/
- Do not create new folders without confirmation

---

## 5. Naming Conventions

```
# Files and Folders
- Components   : PascalCase     e.g. Button.tsx, Card.tsx
- Non-components: camelCase     e.g. useAuthStore.ts, dateUtils.ts
- Folders      : kebab-case     e.g. components/ui/

# In Code
- Variables    : camelCase       e.g. userData, isLoading
- Constants    : UPPER_SNAKE     e.g. NATIONAL_VACCINE_SCHEDULE
- Functions    : camelCase       e.g. getAgeInMonths, formatDate
- Types/Interfaces: PascalCase  e.g. Baby, VaccineRecord
- Enums        : PascalCase      e.g. VaccineStatus
```

---

## 6. Code Conventions

```
- Apply DRY and clean code principles
- No inline code comments
- Use strict TypeScript mode, no 'any' types
- Always write explicit return types for functions

# Import Order
1. External libraries (React, Expo, etc.)
2. Internal absolute (@/ paths)
3. Internal relative (./Component)
4. Types and Interfaces

# Export Pattern
- Named exports for components and functions
- Default exports only for route pages
```

---

## 7. Styling Rules

```
- Use NativeWind (Tailwind CSS) utility classes
- Use clsx for conditional classes
- Fonts: Poppins for headings, Work Sans for body text
- Mobile-first approach
- Design tokens defined in tailwind.config.js and src/constants/colors.ts
```

---

## 8. State Management Rules

```
- One Zustand store per domain (auth, baby, vaccine, education, notification, admin)
- Use selectors to pick specific state
- Store only essential data, compute derived values
- Demo/mock data included in stores for development
```

---

## 9. Environment Variables

```
# Copy .env.example to .env for local development
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

---

## 10. Features

```
# Completed
- [x] Dashboard (Home Screen)
- [x] Profil Bayi (Input Data & Prediksi Jadwal)
- [x] Pusat Edukasi (Artikel, Video, Kuis)
- [x] Pengingat Imunisasi (Kalender & Notifikasi H-7/H-1)
- [x] Pemantauan & Catatan
- [x] Konsultasi & Info Kesehatan (Chat & Direktori Nakes)
- [x] Report & Analisis (User Dashboard)
- [x] Admin Panel
- [x] Post-test Quiz
- [x] Feedback Form
- [x] Firebase service layer
- [x] Zustand state management
- [x] Custom chart components (Donut, Bar, Line)

# Planned
- [ ] Authentication flow (Login/Signup screens)
- [ ] Push notifications (expo-notifications)
- [ ] Image upload for chat
- [ ] PDF export functionality
- [ ] Real-time chat with Firestore listeners
```

---

## 11. Do Not

```
- Do not use 'any' type in TypeScript
- Do not hardcode values that should be env variables
- Do not commit .env files
- Do not install packages without confirmation
- Do not add inline code comments
- Do not use useEffect for data fetching
- Do not create new folders without confirmation
```
