import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../src/components/ui/Card';
import { DonutChart } from '../src/components/charts/DonutChart';
import { BarChart } from '../src/components/charts/BarChart';
import { ProgressBar } from '../src/components/ui/ProgressBar';
import { AppBar } from '../src/components/ui/AppBar';
import { useEducationStore } from '../src/stores/useEducationStore';
import { useVaccineStore } from '../src/stores/useVaccineStore';
import { useResponsive } from '../src/utils/useResponsive';

export default function ReportScreen(): React.ReactElement {
  const quizScores = useEducationStore((state) => state.quizScores);
  const currentScore = useEducationStore((state) => state.currentScore);
  const completionPercentage = useVaccineStore((state) => state.completionPercentage);
  const { isTablet, px } = useResponsive();

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 420, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, speed: 12, bounciness: 4 }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const knowledgeProgress = [
    {
      month: 'Bulan 1',
      isCurrent: false,
      categories: [
        { name: 'Rutinitas Tidur', percentage: 45 },
        { name: 'Nutrisi', percentage: 60 },
      ],
    },
    {
      month: 'Bulan 6 (Sekarang)',
      isCurrent: true,
      categories: [
        { name: 'Rutinitas Tidur', percentage: 95 },
        { name: 'Nutrisi', percentage: 88 },
      ],
    },
  ];

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
          <Text
            style={{ fontSize: isTablet ? 26 : 22 }}
            className="font-poppins-bold text-content-primary mb-1"
          >
            Laporan & Analisis
          </Text>
          <Text className="font-worksans text-base text-content-secondary mb-5">
            Ringkasan perjalanan kesehatan Anda dan pertumbuhan bayi.
          </Text>

          <View className={isTablet ? 'flex-row gap-x-4 mb-0' : ''}>
            <Card
              variant="default"
              padding="large"
              className="mb-5"
              style={isTablet ? { flex: 1 } : undefined}
            >
              <View className="flex-row items-center mb-4">
                <Ionicons name="medical-outline" size={20} color="#1A6B8A" />
                <Text
                  style={{ fontSize: isTablet ? 18 : 16 }}
                  className="font-poppins-bold text-content-primary ml-2"
                >
                  Status Imunisasi Bayi
                </Text>
              </View>
              <DonutChart
                percentage={85}
                centerLabel=""
                centerSubLabel=""
                size={isTablet ? 220 : 180}
              />
              <View className="flex-row justify-center mt-4 mb-3">
                <View className="flex-row items-center mr-6">
                  <View className="w-3 h-3 rounded-full bg-primary mr-2" />
                  <Text className="font-worksans text-sm text-content-secondary">Selesai</Text>
                </View>
                <View className="flex-row items-center">
                  <View className="w-3 h-3 rounded-full bg-primary-100 mr-2" />
                  <Text className="font-worksans text-sm text-content-secondary">Mendatang</Text>
                </View>
              </View>
              <View className="flex-row justify-around mt-2">
                <View className="items-center bg-primary-50 rounded-xl px-6 py-3">
                  <Text className="font-poppins-bold text-2xl text-primary">85%</Text>
                  <Text className="font-worksans text-sm text-content-secondary">Selesai</Text>
                </View>
                <View className="items-center bg-primary-50 rounded-xl px-6 py-3">
                  <Text className="font-poppins-bold text-2xl text-primary">1</Text>
                  <Text className="font-worksans text-sm text-content-secondary">Mendatang</Text>
                </View>
              </View>
            </Card>

            <Card
              variant="default"
              padding="large"
              className="mb-5"
              style={isTablet ? { flex: 1 } : undefined}
            >
              <View className="flex-row items-center mb-4">
                <Ionicons name="trending-up-outline" size={20} color="#1A6B8A" />
                <Text
                  style={{ fontSize: isTablet ? 18 : 16 }}
                  className="font-poppins-bold text-content-primary ml-2"
                >
                  Peningkatan Skor Kuis
                </Text>
              </View>
              <BarChart data={quizScores} />
            </Card>
          </View>

          <Card variant="default" padding="large" className="mb-5 bg-primary-50">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 rounded-full bg-white items-center justify-center mr-3">
                  <Ionicons name="bulb-outline" size={22} color="#1A6B8A" />
                </View>
                <View className="flex-1">
                  <Text className="font-worksans text-xs text-content-secondary">
                    Tingkat Pengetahuan Saat Ini
                  </Text>
                  <Text className="font-poppins-bold text-base text-content-primary">
                    Pengasuh Tingkat Lanjut
                  </Text>
                </View>
              </View>
              <View className="items-end">
                <Text className="font-worksans text-xs text-content-secondary">Skor Rata-rata</Text>
                <Text className="font-poppins-bold text-3xl text-primary">{currentScore}%</Text>
              </View>
            </View>
          </Card>

          <Card variant="default" padding="large" className="mb-5">
            <View className="flex-row items-center mb-4">
              <Ionicons name="analytics-outline" size={20} color="#1A6B8A" />
              <Text
                style={{ fontSize: isTablet ? 18 : 16 }}
                className="font-poppins-bold text-content-primary ml-2"
              >
                Pertumbuhan Pengetahuan
              </Text>
            </View>

            <View className={isTablet ? 'flex-row gap-x-4' : ''}>
              {knowledgeProgress.map((item, index) => (
                <Card
                  key={index}
                  variant="default"
                  padding="medium"
                  className="mb-3"
                  style={{
                    borderWidth: item.isCurrent ? 1.5 : 1,
                    borderColor: item.isCurrent ? '#1A6B8A' : '#E0E8ED',
                    ...(isTablet ? { flex: 1 } : {}),
                  }}
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View
                      className={`rounded-full px-3 py-1 ${
                        item.isCurrent ? 'bg-primary' : 'bg-surface-muted'
                      }`}
                    >
                      <Text
                        className={`font-worksans-semibold text-xs ${
                          item.isCurrent ? 'text-white' : 'text-content-secondary'
                        }`}
                      >
                        {item.month}
                      </Text>
                    </View>
                    {item.isCurrent ? (
                      <Ionicons name="checkmark-circle" size={22} color="#28A745" />
                    ) : (
                      <Ionicons name="help-circle-outline" size={22} color="#8A9BAC" />
                    )}
                  </View>

                  {item.categories.map((cat, cIndex) => (
                    <View key={cIndex} className="mb-2">
                      <View className="flex-row justify-between mb-1">
                        <Text className="font-worksans text-sm text-content-primary">
                          {cat.name}
                        </Text>
                        <Text
                          className={`font-poppins-semibold text-sm ${
                            cat.percentage >= 80 ? 'text-success' : 'text-danger'
                          }`}
                        >
                          {cat.percentage}%
                        </Text>
                      </View>
                      <ProgressBar
                        percentage={cat.percentage}
                        showLabel={false}
                        height={8}
                        color={cat.percentage >= 80 ? '#28A745' : '#DC3545'}
                      />
                    </View>
                  ))}
                </Card>
              ))}
            </View>
          </Card>

          <TouchableOpacity
            className="flex-row items-center justify-center bg-primary rounded-button py-4 w-full"
            style={{
              shadowColor: '#1A6B8A',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <Ionicons name="download-outline" size={22} color="#FFFFFF" />
            <Text className="font-poppins-semibold text-base text-white ml-2">
              Ekspor Laporan PDF
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
