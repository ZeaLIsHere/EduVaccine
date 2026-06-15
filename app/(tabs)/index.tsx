import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../src/components/ui/Card';
import { Badge } from '../../src/components/ui/Badge';
import { ProgressBar } from '../../src/components/ui/ProgressBar';
import { LineChart } from '../../src/components/charts/LineChart';
import { AppBar } from '../../src/components/ui/AppBar';
import { useBabyStore } from '../../src/stores/useBabyStore';
import { useVaccineStore } from '../../src/stores/useVaccineStore';
import { useResponsive } from '../../src/utils/useResponsive';

export default function DashboardScreen(): React.ReactElement {
  const router = useRouter();
  const baby = useBabyStore((state) => state.baby);
  const completionPercentage = useVaccineStore((state) => state.completionPercentage);
  const growthData = useVaccineStore((state) => state.growthData);
  const { isTablet, px, numColumns } = useResponsive();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 420,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        speed: 12,
        bounciness: 4,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const quickActions = [
    {
      icon: 'school-outline' as const,
      label: 'Mulai Edukasi',
      color: '#E8F4F8',
      onPress: () => router.push('/edukasi'),
    },
    {
      icon: 'calendar-outline' as const,
      label: 'Jadwal Imunisasi',
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
      label: 'Riwayat Imunisasi',
      color: '#E8F4F8',
      onPress: () => router.push('/pemantauan'),
    },
  ];

  const cardWidth = numColumns === 4 ? '24%' : '48%';

  return (
    <SafeAreaView className="flex-1 bg-surface-secondary">
      <AppBar hasNotification />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingHorizontal: px,
            paddingTop: 8,
            paddingBottom: 24,
          }}
        >
          <View className="mb-2">
            <Text
              style={{ fontSize: isTablet ? 16 : 14 }}
              className="font-worksans text-content-secondary"
            >
              Selamat datang kembali,
            </Text>
            <Text
              style={{ fontSize: isTablet ? 24 : 18 }}
              className="font-poppins-bold text-primary"
            >
              Perjalanan {baby?.name || 'Bayi'}
            </Text>
          </View>

          <TouchableOpacity activeOpacity={0.9} className="mb-5 mt-3">
            <Card variant="default" padding="large" className="bg-accent">
              <View className="flex-row items-start">
                <View className="w-12 h-12 rounded-full bg-white/60 items-center justify-center mr-3">
                  <Ionicons name="medical-outline" size={24} color="#1A6B8A" />
                </View>
                <View className="flex-1">
                  <Text className="font-worksans-semibold text-xs text-content-secondary uppercase tracking-wider mb-1">
                    JADWAL MENDATANG
                  </Text>
                  <Text
                    style={{ fontSize: isTablet ? 20 : 17 }}
                    className="font-poppins-bold text-content-primary mb-1"
                  >
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
              <Text
                style={{ fontSize: isTablet ? 20 : 18 }}
                className="font-poppins-bold text-content-primary"
              >
                Status Imunisasi
              </Text>
              <Badge text="Sesuai Jadwal" variant="primary" />
            </View>
            <ProgressBar percentage={completionPercentage} />
          </View>

          <Card variant="default" padding="large" className="mb-5 bg-primary-50">
            <View className="flex-row items-center justify-between mb-3">
              <View>
                <Text
                  style={{ fontSize: isTablet ? 20 : 18 }}
                  className="font-poppins-bold text-content-primary"
                >
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

          <Text
            style={{ fontSize: isTablet ? 20 : 18 }}
            className="font-poppins-bold text-content-primary mb-4"
          >
            Aksi Cepat
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={action.onPress}
                activeOpacity={0.8}
                style={{ width: cardWidth, marginBottom: 12 }}
              >
                <Card variant="default" padding="large">
                  <View className="w-12 h-12 rounded-full bg-primary-50 items-center justify-center mb-3">
                    <Ionicons name={action.icon} size={isTablet ? 28 : 24} color="#1A6B8A" />
                  </View>
                  <Text
                    style={{ fontSize: isTablet ? 14 : 13 }}
                    className="font-poppins-semibold text-content-primary"
                  >
                    {action.label}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
