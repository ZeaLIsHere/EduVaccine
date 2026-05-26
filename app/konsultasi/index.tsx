import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';

export default function KonsultasiIndexScreen(): React.ReactElement {
  const router = useRouter();

  const directoryItems = [
    {
      icon: 'medkit-outline' as const,
      title: 'Tenaga Kesehatan',
      description: 'Profesional bersertifikat untuk perawatan umum ibu dan anak.',
      cta: 'Lihat Daftar',
      topBorderColor: '#1A6B8A',
      iconBg: '#E8F4F8',
    },
    {
      icon: 'person-outline' as const,
      title: 'Bidan',
      description: 'Dukungan khusus untuk kehamilan, persalinan, dan nifas.',
      cta: 'Cari Bidan',
      topBorderColor: '#F1AEB5',
      iconBg: '#FDE8EA',
    },
    {
      icon: 'business-outline' as const,
      title: 'Puskesmas',
      description: 'Pusat kesehatan masyarakat untuk layanan lokal yang terjangkau.',
      cta: 'Cari Lokasi',
      topBorderColor: '#145570',
      iconBg: '#E8F4F8',
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
            Dukungan & Info Kesehatan
          </Text>
          <Text className="font-worksans text-base text-content-secondary mb-6">
            Dapatkan perawatan dan panduan yang Anda butuhkan untuk perjalanan yang sehat.
          </Text>

          <TouchableOpacity
            onPress={() => router.push('/konsultasi/chat')}
            activeOpacity={0.8}
          >
            <Card variant="default" padding="large" className="mb-3 bg-primary-50">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="font-poppins-bold text-lg text-primary mb-1">
                    Konsultasi Chat Singkat
                  </Text>
                  <Text className="font-worksans text-sm text-content-secondary">
                    Hubungi tenaga kesehatan secara instan.
                  </Text>
                </View>
                <View className="w-12 h-12 rounded-full bg-white items-center justify-center ml-3">
                  <Ionicons name="chatbubble-ellipses-outline" size={24} color="#1A6B8A" />
                </View>
              </View>
            </Card>
          </TouchableOpacity>

          <Card variant="default" padding="large" className="mb-6 bg-accent-light">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="font-poppins-bold text-lg text-primary mb-1">
                  Cari Layanan Imunisasi Terdekat
                </Text>
                <Text className="font-worksans text-sm text-content-secondary">
                  Temukan klinik untuk pemeriksaan bayi Anda berikutnya.
                </Text>
              </View>
              <View className="w-12 h-12 rounded-full bg-white items-center justify-center ml-3">
                <Ionicons name="medical-outline" size={24} color="#1A6B8A" />
              </View>
            </View>
          </Card>

          <Text className="font-poppins-bold text-xl text-content-primary mb-4">
            Direktori
          </Text>

          {directoryItems.map((item, index) => (
            <Card key={index} variant="default" padding="none" className="mb-4 overflow-hidden">
              <View className="h-1.5" style={{ backgroundColor: item.topBorderColor }} />
              <View className="p-5">
                <View className="flex-row items-center mb-2">
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    style={{ backgroundColor: item.iconBg }}
                  >
                    <Ionicons name={item.icon} size={22} color="#1A6B8A" />
                  </View>
                  <Text className="font-poppins-bold text-lg text-content-primary">
                    {item.title}
                  </Text>
                </View>
                <Text className="font-worksans text-sm text-content-secondary mb-4">
                  {item.description}
                </Text>
                <Button title={item.cta} onPress={() => {}} variant="outline" />
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
