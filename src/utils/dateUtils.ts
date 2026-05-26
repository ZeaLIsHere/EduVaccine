import { format, differenceInMonths, differenceInDays, addMonths, addDays, isAfter, isBefore, isToday } from 'date-fns';
import { id as idLocale } from 'date-fns/locale';

export function formatDate(date: Date, pattern: string = 'dd/MM/yyyy'): string {
  return format(date, pattern, { locale: idLocale });
}

export function formatDateIndonesian(date: Date): string {
  return format(date, 'd MMMM yyyy', { locale: idLocale });
}

export function getAgeInMonths(birthDate: Date): number {
  return differenceInMonths(new Date(), birthDate);
}

export function getDaysUntil(targetDate: Date): number {
  return differenceInDays(targetDate, new Date());
}

export function getScheduledDate(birthDate: Date, ageInMonths: number): Date {
  return addMonths(birthDate, ageInMonths);
}

export function addDaysToDate(date: Date, days: number): Date {
  return addDays(date, days);
}

export function isDateAfterToday(date: Date): boolean {
  return isAfter(date, new Date());
}

export function isDateBeforeToday(date: Date): boolean {
  return isBefore(date, new Date());
}

export function isDateToday(date: Date): boolean {
  return isToday(date);
}

export function getMonthYear(date: Date): string {
  return format(date, 'MMMM yyyy', { locale: idLocale });
}

export function getCalendarDayLabel(date: Date): string {
  return format(date, 'd');
}

export function getTimeLabel(date: Date): string {
  return format(date, 'HH:mm');
}

export function getAgeLabel(months: number): string {
  if (months < 1) return 'Baru Lahir';
  if (months === 1) return '1 Bulan';
  return `${months} Bulan`;
}
