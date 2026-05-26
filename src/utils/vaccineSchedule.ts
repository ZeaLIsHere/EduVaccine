import { NATIONAL_VACCINE_SCHEDULE } from '../constants/vaccines';
import { VaccineGroup, VaccineItem } from '../types';
import { getScheduledDate, isDateBeforeToday, isDateToday, getAgeInMonths, formatDate } from './dateUtils';

export function generateVaccineSchedule(
  birthDate: Date,
  completedVaccines: string[]
): VaccineGroup[] {
  const currentAgeMonths = getAgeInMonths(birthDate);

  return NATIONAL_VACCINE_SCHEDULE.map((item) => {
    const scheduledDate = getScheduledDate(birthDate, item.ageInMonths);
    const vaccines: VaccineItem[] = item.vaccines.map((v) => ({
      name: v,
      completed: completedVaccines.includes(v),
    }));

    const allCompleted = vaccines.every((v) => v.completed);
    const isPast = isDateBeforeToday(scheduledDate) || isDateToday(scheduledDate);

    let status: 'completed' | 'upcoming' | 'overdue';
    if (allCompleted) {
      status = 'completed';
    } else if (isPast && item.ageInMonths <= currentAgeMonths) {
      status = 'overdue';
    } else {
      status = 'upcoming';
    }

    return {
      ageInMonths: item.ageInMonths,
      label: item.label,
      status,
      scheduledDate: formatDate(scheduledDate),
      vaccines,
    };
  });
}

export function getUpcomingVaccines(
  birthDate: Date,
  completedVaccines: string[]
): VaccineGroup[] {
  const schedule = generateVaccineSchedule(birthDate, completedVaccines);
  return schedule.filter((g) => g.status === 'upcoming' || g.status === 'overdue');
}

export function getCompletionPercentage(
  birthDate: Date,
  completedVaccines: string[]
): number {
  const ageMonths = getAgeInMonths(birthDate);
  const relevantSchedule = NATIONAL_VACCINE_SCHEDULE.filter(
    (item) => item.ageInMonths <= ageMonths
  );

  if (relevantSchedule.length === 0) return 100;

  const totalVaccines = relevantSchedule.reduce(
    (sum, item) => sum + item.vaccines.length,
    0
  );

  const completed = relevantSchedule.reduce((sum, item) => {
    return (
      sum +
      item.vaccines.filter((v) => completedVaccines.includes(v)).length
    );
  }, 0);

  return Math.round((completed / totalVaccines) * 100);
}

export function getNextVaccineInfo(
  birthDate: Date,
  completedVaccines: string[]
): { name: string; daysUntil: number; ageLabel: string } | null {
  const schedule = generateVaccineSchedule(birthDate, completedVaccines);
  const next = schedule.find((g) => g.status === 'upcoming');
  if (!next) return null;

  const scheduledDate = getScheduledDate(birthDate, next.ageInMonths);
  const now = new Date();
  const daysUntil = Math.ceil(
    (scheduledDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  return {
    name: next.vaccines.map((v) => v.name).join(', '),
    daysUntil: Math.max(0, daysUntil),
    ageLabel: next.label,
  };
}
