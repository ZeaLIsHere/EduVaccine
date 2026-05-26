import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../src/components/ui/Card';
import { DonutChart } from '../src/components/charts/DonutChart';
import { useAdminStore } from '../src/stores/useAdminStore';

export default function AdminScreen(): React.ReactElement {
  const stats = useAdminStore((state) => state.stats);
  const videoViews = useAdminStore((state) => state.videoViews);
  const pageViews = useAdminStore((state) => state.pageViews);

  const immunizedPercentage = Math.round(
    (stats.immunized / stats.totalBabies) * 100
  ) || 72;

  return (
    <SafeAreaView className="flex-1 bg-surface-secondary">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-5">
            <View className="flex-row items-center">
              <TouchableOpacity className="mr-3">
                <Ionicons name="menu" size={26} color="#1A2B3C" />
              </TouchableOpacity>
              <Text className="font-poppins-bold text-2xl text-content-primary">
                Panel Admin
              </Text>
            </View>
            <View className="flex-row items-center">
              <TouchableOpacity className="mr-3">
                <Ionicons name="notifications-outline" size={24} color="#1A2B3C" />
              </TouchableOpacity>
              <View className="w-9 h-9 rounded-full bg-primary items-center justify-center">
                <Ionicons name="person" size={18} color="#FFFFFF" />
              </View>
            </View>
          </View>

          <Card variant="default" padding="large" className="mb-5 bg-primary-50">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="font-worksans-semibold text-sm text-content-secondary mb-1">
                  Total Sesi Aplikasi
                </Text>
                <Text className="font-poppins-bold text-4xl text-content-primary">
                  {stats.totalSessions.toLocaleString()}
                </Text>
                <View className="flex-row items-center mt-2">
                  <Ionicons name="trending-up" size={16} color="#28A745" />
                  <Text className="font-worksans-medium text-sm text-success ml-1">
                    +{stats.sessionsTrend}% dari bulan lalu
                  </Text>
                </View>
              </View>
              <View className="opacity-20">
                <Ionicons name="analytics" size={60} color="#1A6B8A" />
              </View>
            </View>
          </Card>

          <Card variant="default" padding="large" className="mb-5">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="font-poppins-bold text-lg text-content-primary">
                Views per Video (Teratas)
              </Text>
              <TouchableOpacity>
                <Text className="font-worksans-semibold text-sm text-primary">Lihat Semua</Text>
              </TouchableOpacity>
            </View>

            {videoViews.map((video, index) => (
              <View key={video.id} className="flex-row items-center mb-4">
                <View className="w-12 h-12 rounded-xl bg-primary-50 items-center justify-center mr-3">
                  <Ionicons name="play-circle-outline" size={24} color="#1A6B8A" />
                </View>
                <View className="flex-1">
                  <Text className="font-poppins-semibold text-sm text-content-primary" numberOfLines={1}>
                    {video.title}
                  </Text>
                  <Text className="font-worksans text-xs text-content-muted">
                    {video.category} • {video.duration}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="font-poppins-bold text-base text-primary">
                    {video.views.toLocaleString()}
                  </Text>
                  <Text className="font-worksans text-xs text-content-muted">Views</Text>
                </View>
              </View>
            ))}
          </Card>

          <Card variant="default" padding="large" className="mb-5">
            <Text className="font-poppins-bold text-lg text-content-primary text-center mb-4">
              Status Imunisasi Bayi
            </Text>
            <DonutChart
              percentage={immunizedPercentage}
              centerLabel={`${immunizedPercentage}%`}
              centerSubLabel="Sudah"
              size={180}
            />
            <View className="mt-4">
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                  <View className="w-3 h-3 rounded-full bg-primary mr-2" />
                  <Text className="font-worksans text-sm text-content-primary">Sudah Imunisasi</Text>
                </View>
                <Text className="font-poppins-bold text-base text-content-primary">
                  {stats.immunized.toLocaleString()}
                </Text>
              </View>
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <View className="w-3 h-3 rounded-full bg-primary-100 mr-2" />
                  <Text className="font-worksans text-sm text-content-primary">Belum Imunisasi</Text>
                </View>
                <Text className="font-poppins-bold text-base text-content-primary">
                  {stats.notImmunized.toLocaleString()}
                </Text>
              </View>
              <Text className="font-worksans text-sm text-content-muted text-center italic">
                Total Terdaftar: {stats.totalBabies.toLocaleString()} Bayi
              </Text>
            </View>
          </Card>

          <Card variant="default" padding="large" className="mb-5">
            <Text className="font-poppins-bold text-lg text-content-primary text-center mb-4">
              Halaman Paling Sering Dikunjungi
            </Text>

            <View className="flex-row items-center justify-between mb-3 pb-2 border-b border-border">
              <Text className="font-worksans-semibold text-xs text-content-muted uppercase flex-1">
                HALAMAN
              </Text>
              <Text className="font-worksans-semibold text-xs text-content-muted uppercase w-24 text-right">
                KUNJUNGAN
              </Text>
              <Text className="font-worksans-semibold text-xs text-content-muted uppercase w-12 text-right">
                DU...
              </Text>
            </View>

            {pageViews.map((page, index) => (
              <View key={index} className="flex-row items-center justify-between py-3 border-b border-border-light">
                <View className="flex-row items-center flex-1">
                  <Ionicons name="link-outline" size={16} color="#8A9BAC" />
                  <Text className="font-worksans text-sm text-content-primary ml-2" numberOfLines={1}>
                    {page.path}
                  </Text>
                </View>
                <Text className="font-poppins-semibold text-sm text-content-primary w-24 text-right">
                  {page.visits.toLocaleString()}
                </Text>
                <Text className="font-worksans text-sm text-content-muted w-12 text-right">
                  {page.duration}
                </Text>
              </View>
            ))}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
