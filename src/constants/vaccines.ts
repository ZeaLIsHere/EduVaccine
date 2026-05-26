export interface VaccineScheduleItem {
  ageInMonths: number;
  label: string;
  vaccines: string[];
  descriptions: string[];
}

export const NATIONAL_VACCINE_SCHEDULE: VaccineScheduleItem[] = [
  {
    ageInMonths: 0,
    label: 'Lahir',
    vaccines: ['Hepatitis B (Dosis 1)', 'BCG', 'Polio (OPV 0)'],
    descriptions: [
      'Melindungi dari Hepatitis B.',
      'Melindungi dari Tuberkulosis (TBC).',
      'Melindungi dari Polio.',
    ],
  },
  {
    ageInMonths: 2,
    label: '2 Bulan',
    vaccines: ['DPT-HB-Hib (Dosis 1)', 'Polio (OPV 1)', 'Rotavirus (Dosis 1)'],
    descriptions: [
      'Melindungi dari Difteri, Tetanus, Pertusis, Hib, dan Hepatitis B.',
      'Melindungi dari Polio.',
      'Melindungi dari diare parah akibat rotavirus.',
    ],
  },
  {
    ageInMonths: 3,
    label: '3 Bulan',
    vaccines: ['DPT-HB-Hib (Dosis 2)', 'Polio (OPV 2)'],
    descriptions: [
      'Melindungi dari Difteri, Tetanus, Pertusis, Hib, dan Hepatitis B.',
      'Melindungi dari Polio.',
    ],
  },
  {
    ageInMonths: 4,
    label: '4 Bulan',
    vaccines: ['DPT-HB-Hib (Dosis 3)', 'Polio (OPV 3)', 'Polio (IPV)', 'Rotavirus (Dosis 2)'],
    descriptions: [
      'Melindungi dari Difteri, Tetanus, Pertusis, Hib, dan Hepatitis B.',
      'Melindungi dari Polio.',
      'Melindungi dari Polio (suntik).',
      'Melindungi dari diare parah akibat rotavirus.',
    ],
  },
  {
    ageInMonths: 6,
    label: '6 Bulan',
    vaccines: ['DPT, IPV, Hep B, RV', 'Vaksin Flu (Tahunan)'],
    descriptions: [
      'Difteri, Tetanus, Pertusis, Polio, Hepatitis B, Rotavirus.',
      'Melindungi dari influenza musiman.',
    ],
  },
  {
    ageInMonths: 9,
    label: '9 Bulan',
    vaccines: ['Campak / MR (Dosis 1)'],
    descriptions: ['Melindungi dari Campak dan Rubella.'],
  },
  {
    ageInMonths: 12,
    label: '12 Bulan',
    vaccines: ['MMR', 'Varicella', 'Hep A'],
    descriptions: [
      'Melindungi dari Campak, Gondongan, Rubella.',
      'Melindungi dari Cacar Air.',
      'Melindungi dari Hepatitis A.',
    ],
  },
  {
    ageInMonths: 15,
    label: '15 Bulan',
    vaccines: ['DPT (Dosis 4)'],
    descriptions: ['Booster Difteri, Tetanus, Pertusis.'],
  },
  {
    ageInMonths: 18,
    label: '18 Bulan',
    vaccines: ['Campak / MR (Dosis 2)', 'DPT-HB-Hib (Booster)', 'Polio (Booster)'],
    descriptions: [
      'Booster Campak dan Rubella.',
      'Booster Difteri, Tetanus, Pertusis, Hib, Hepatitis B.',
      'Booster Polio.',
    ],
  },
  {
    ageInMonths: 24,
    label: '24 Bulan',
    vaccines: ['Hepatitis A (Dosis 2)', 'Tifoid'],
    descriptions: [
      'Booster Hepatitis A.',
      'Melindungi dari Demam Tifoid.',
    ],
  },
];

export const VACCINE_CATEGORIES = [
  'Imunisasi',
  'Panduan',
  'Info Terbaru',
  'Edukasi',
];
