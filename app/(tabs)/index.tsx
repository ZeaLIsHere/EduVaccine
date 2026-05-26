import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../src/components/ui/Card';
import { Badge } from '../../src/components/ui/Badge';
import { ProgressBar } from '../../src/components/ui/ProgressBar';
import { LineChart } from '../../src/components/charts/LineChart';
import { useBabyStore } from '../../src/stores/useBabyStore';
import { useVaccineStore } from '../../src/stores/useVaccineStore';

export default function DashboardScreen(): React.ReactElement {
  const router = useRouter();
  const baby = useBabyStore((state) => state.baby);
  const completionPercentage = useVaccineStore((state) => state.completionPercentage);
  const growthData = useVaccineStore((state) => state.growthData);

  const quickActions = [
    {
      icon: 'school-outline' as const,
      label: 'Mulai Edukasi',
      color: '#E8F4F8',
      onPress: () => router.push('/edukasi'),
    },
    {
      icon: 'calendar-outline' as const,
      label: 'Jadwal\nImunisasi',
      color: '#E8F4F8',
      onPress: () => router.push('/kalender'),
    },
    {
      icon: 'bar-chart-outline' as const,
      label: 'Lihat Progres',
      color: '#E8F4F8',
      onPress: () => router.push('/report'),
    },
    {
      icon: 'time-outline' as const,
      label: 'Riwayat\nImunisasi',
      color: '#E8F4F8',
      onPress: () => router.push('/pemantauan'),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-surface-secondary">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center">
              <View className="w-12 h-12 rounded-full bg-accent items-center justify-center mr-3 overflow-hidden">
                <Ionicons name="happy-outline" size={28} color="#1A6B8A" />
              </View>
              <View>
                <Text className="font-worksans text-sm text-content-secondary">
                  Selamat datang kembali,
                </Text>
                <Text className="font-poppins-bold text-lg text-primary">
                  Perjalanan {baby?.name || 'Bayi'}
                </Text>
              </View>
            </View>
            <TouchableOpacity className="relative">
              <Ionicons name="notifications-outline" size={26} color="#1A2B3C" />
              <View className="absolute -top-1 -right-1 w-3 h-3 bg-danger rounded-full border-2 border-white" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity activeOpacity={0.9}>
            <Card variant="default" padding="large" className="bg-accent mb-5">
              <View className="flex-row items-start">
                <View className="w-12 h-12 rounded-full bg-white/60 items-center justify-center mr-3">
                  <Ionicons name="medical-outline" size={24} color="#1A6B8A" />
                </View>
                <View className="flex-1">
                  <Text className="font-worksans-semibold text-xs text-content-secondary uppercase tracking-wider mb-1">
                    JADWAL MENDATANG
                  </Text>
                  <Text className="font-poppins-bold text-xl text-content-primary mb-1">
                    Imunisasi 6-Bulan dalam 4 hari.
                  </Text>
                  <View className="flex-row items-center">
                    <Text className="font-worksans-medium text-sm text-primary">
                      Lihat Detail
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color="#1A6B8A" />
                  </View>
                </View>
              </View>
            </Card>
          </TouchableOpacity>

          <View className="mb-5">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="font-poppins-bold text-xl text-content-primary">
                Status Imunisasi
              </Text>
              <Badge text="Sesuai Jadwal" variant="primary" />
            </View>
            <ProgressBar percentage={completionPercentage} />
          </View>

          <Card variant="default" padding="large" className="mb-5 bg-primary-50">
            <View className="flex-row items-center justify-between mb-3">
              <View>
                <Text className="font-poppins-bold text-xl text-content-primary">
                  Ringkasan Pertumbuhan
                </Text>
                <Text className="font-worksans text-sm text-content-secondary">
                  Lini masa Berat & Tinggi
                </Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="expand-outline" size={22} color="#1A6B8A" />
              </TouchableOpacity>
            </View>
            <LineChart data={growthData} />
          </Card>

          <Text className="font-poppins-bold text-xl text-content-primary mb-4">
            Aksi Cepat
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={action.onPress}
                activeOpacity={0.8}
                className="w-[48%] mb-3"
              >
                <Card variant="default" padding="large">
                  <View className="w-12 h-12 rounded-full bg-primary-50 items-center justify-center mb-3">
                    <Ionicons name={action.icon} size={24} color="#1A6B8A" />
                  </View>
                  <Text className="font-poppins-semibold text-sm text-content-primary">
                    {action.label}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
