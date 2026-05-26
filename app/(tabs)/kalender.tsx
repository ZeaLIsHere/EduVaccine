import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../src/components/ui/Card';
import { Toggle } from '../../src/components/ui/Toggle';
import { useNotificationStore } from '../../src/stores/useNotificationStore';

const DAYS_OF_WEEK = ['M', 'S', 'S', 'R', 'K', 'J', 'S'];

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasEvent: boolean;
}

function generateCalendarDays(): CalendarDay[] {
  const days: CalendarDay[] = [];
  const prevMonth = [29, 30, 31];
  prevMonth.forEach((d) => {
    days.push({ day: d, isCurrentMonth: false, isToday: false, hasEvent: false });
  });
  for (let i = 1; i <= 30; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      isToday: i === 14,
      hasEvent: i === 2 || i === 17,
    });
  }
  const nextMonth = [1, 2];
  nextMonth.forEach((d) => {
    days.push({ day: d, isCurrentMonth: false, isToday: false, hasEvent: false });
  });
  return days;
}

export default function KalenderScreen(): React.ReactElement {
  const h7Enabled = useNotificationStore((state) => state.h7Enabled);
  const h1Enabled = useNotificationStore((state) => state.h1Enabled);
  const toggleH7 = useNotificationStore((state) => state.toggleH7);
  const toggleH1 = useNotificationStore((state) => state.toggleH1);

  const [currentMonth] = useState('November 2023');
  const calendarDays = generateCalendarDays();

  const upcomingSchedule = [
    {
      month: 'Nov',
      day: 14,
      name: 'DTP-Hib-HepB (Dosis 1)',
      description: 'Melindungi dari Difteri, Tetanus, Pertusis, Hib, dan Hepatitis B.',
      countdown: 'Dalam 3 Hari',
      bgColor: '#E8F4F8',
      borderColor: '#1A6B8A',
    },
    {
      month: 'Nov',
      day: 17,
      name: 'Rotavirus (Dosis 1)',
      description: 'Melindungi dari diare parah akibat rotavirus.',
      countdown: '',
      bgColor: '#FFF3CD',
      borderColor: '#FFC107',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-surface-secondary">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-primary-50 items-center justify-center mr-3">
                <Ionicons name="happy-outline" size={22} color="#1A6B8A" />
              </View>
              <Text className="font-poppins-bold text-2xl text-primary">eduVaccin</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={26} color="#1A2B3C" />
            </TouchableOpacity>
          </View>

          <Text className="font-poppins-bold text-2xl text-content-primary mb-1">
            Pengingat Imunisasi
          </Text>
          <Text className="font-worksans text-base text-content-secondary mb-5">
            Pantau jadwal vaksinasi bayi Anda dengan mudah.
          </Text>

          <Card variant="default" padding="large" className="mb-5">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="font-poppins-bold text-lg text-primary">
                {currentMonth}
              </Text>
              <View className="flex-row">
                <TouchableOpacity className="w-8 h-8 rounded-full bg-surface-muted items-center justify-center mr-2">
                  <Ionicons name="chevron-back" size={18} color="#5A6B7C" />
                </TouchableOpacity>
                <TouchableOpacity className="w-8 h-8 rounded-full bg-surface-muted items-center justify-center">
                  <Ionicons name="chevron-forward" size={18} color="#5A6B7C" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="flex-row justify-between mb-3">
              {DAYS_OF_WEEK.map((day, index) => (
                <Text
                  key={index}
                  className="font-worksans-semibold text-sm text-content-muted w-10 text-center"
                >
                  {day}
                </Text>
              ))}
            </View>

            <View className="flex-row flex-wrap">
              {calendarDays.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="w-[14.28%] items-center py-1.5"
                >
                  <View
                    className={`w-9 h-9 rounded-full items-center justify-center ${
                      item.isToday ? 'bg-primary' : ''
                    }`}
                  >
                    <Text
                      className={`font-worksans-medium text-sm ${
                        item.isToday
                          ? 'text-white'
                          : item.isCurrentMonth
                          ? 'text-content-primary'
                          : 'text-content-muted'
                      }`}
                    >
                      {item.day}
                    </Text>
                  </View>
                  {item.hasEvent && (
                    <View className="w-1.5 h-1.5 rounded-full bg-primary mt-0.5" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <View className="flex-row items-center mb-4">
            <Ionicons name="medical-outline" size={22} color="#1A6B8A" />
            <Text className="font-poppins-bold text-xl text-content-primary ml-2">
              Jadwal Berikutnya
            </Text>
          </View>

          {upcomingSchedule.map((item, index) => (
            <Card
              key={index}
              variant="default"
              padding="medium"
              className="mb-3"
              style={{ backgroundColor: item.bgColor }}
            >
              <View className="flex-row">
                <View
                  className="w-14 h-14 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: item.borderColor }}
                >
                  <Text className="font-worksans text-xs text-white">{item.month}</Text>
                  <Text className="font-poppins-bold text-lg text-white">{item.day}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-poppins-bold text-base text-content-primary">
                    {item.name}
                  </Text>
                  <Text className="font-worksans text-sm text-content-secondary">
                    {item.description}
                  </Text>
                  {item.countdown ? (
                    <View className="flex-row items-center mt-1">
                      <Ionicons name="time-outline" size={14} color="#1A6B8A" />
                      <Text className="font-worksans-medium text-xs text-primary ml-1">
                        {item.countdown}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </Card>
          ))}

          <Card variant="default" padding="large" className="mt-3">
            <View className="flex-row items-center mb-4">
              <Ionicons name="alarm-outline" size={22} color="#1A6B8A" />
              <Text className="font-poppins-bold text-xl text-content-primary ml-2">
                Pengaturan Alarm
              </Text>
            </View>

            <View className="flex-row items-start justify-between mb-5">
              <View className="flex-1 mr-4">
                <Text className="font-poppins-semibold text-base text-content-primary mb-1">
                  Ingatkan 1 Minggu Sebelumnya (H-7)
                </Text>
                <Text className="font-worksans text-sm text-content-secondary">
                  Dapatkan notifikasi seminggu lebih awal untuk menjadwalkan janji temu.
                </Text>
              </View>
              <Toggle value={h7Enabled} onToggle={toggleH7} />
            </View>

            <View className="flex-row items-start justify-between mb-4">
              <View className="flex-1 mr-4">
                <Text className="font-poppins-semibold text-base text-content-primary mb-1">
                  Ingatkan 1 Hari Sebelumnya (H-1)
                </Text>
                <Text className="font-worksans text-sm text-content-secondary">
                  Pengingat terakhir sehari sebelum jadwal vaksinasi.
                </Text>
              </View>
              <Toggle value={h1Enabled} onToggle={toggleH1} />
            </View>

            <View className="border-t border-border pt-4">
              <TouchableOpacity className="flex-row items-center justify-center">
                <Ionicons name="time-outline" size={18} color="#1A6B8A" />
                <Text className="font-worksans-semibold text-sm text-primary ml-2">
                  Riwayat Notifikasi
                </Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
