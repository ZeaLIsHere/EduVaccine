import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../src/components/ui/Card';
import { TabSwitcher } from '../../src/components/ui/TabSwitcher';
import { Button } from '../../src/components/ui/Button';
import { useEducationStore } from '../../src/stores/useEducationStore';

export default function EdukasiScreen(): React.ReactElement {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const articles = useEducationStore((state) => state.articles);
  const featuredContent = useEducationStore((state) => state.featuredContent);

  const tabs = ['Artikel', 'Infografis', 'Video Pendek'];

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

          <Text className="font-poppins-bold text-2xl text-primary mb-1">
            Edukasi Interaktif
          </Text>
          <Text className="font-worksans text-base text-content-secondary mb-5">
            Jelajahi panduan lengkap kami untuk menjaga si kecil tetap aman dan sehat. Belajar adalah bagian dari pertumbuhan!
          </Text>

          <TabSwitcher tabs={tabs} activeIndex={activeTab} onTabPress={setActiveTab} />

          <View className="mt-5">
            {featuredContent && (
              <Card variant="default" padding="none" className="mb-5 overflow-hidden">
                <View className="h-48 bg-primary-100 relative">
                  <View className="absolute inset-0 bg-primary-200 items-center justify-center">
                    <Ionicons name="medical" size={60} color="#1A6B8A" />
                  </View>
                  <View className="absolute top-3 left-3 flex-row items-center bg-white/90 rounded-full px-3 py-1">
                    <Ionicons name="star" size={14} color="#FFC107" />
                    <Text className="font-worksans-semibold text-xs text-content-primary ml-1">
                      Unggulan
                    </Text>
                  </View>
                </View>
                <View className="p-4">
                  <View className="flex-row items-center mb-2">
                    <View className="bg-primary-50 rounded-full px-2.5 py-0.5 mr-2">
                      <Text className="font-worksans-medium text-xs text-primary">
                        {featuredContent.category}
                      </Text>
                    </View>
                    <Text className="font-worksans text-xs text-content-muted">
                      {featuredContent.readTime}
                    </Text>
                  </View>
                  <Text className="font-poppins-bold text-lg text-content-primary mb-1">
                    {featuredContent.title}
                  </Text>
                  <Text className="font-worksans text-sm text-content-secondary mb-3">
                    {featuredContent.description}
                  </Text>
                  <TouchableOpacity className="flex-row items-center">
                    <Text className="font-worksans-semibold text-sm text-primary mr-1">
                      Baca Artikel
                    </Text>
                    <Ionicons name="arrow-forward" size={14} color="#1A6B8A" />
                  </TouchableOpacity>
                </View>
              </Card>
            )}

            <Card variant="default" padding="large" className="mb-4 bg-warning-light">
              <View className="w-12 h-12 rounded-full bg-white/80 items-center justify-center mb-3">
                <Ionicons name="calendar" size={24} color="#1A6B8A" />
              </View>
              <Text className="font-poppins-bold text-lg text-content-primary mb-1">
                Jadwal Nasional
              </Text>
              <Text className="font-worksans text-sm text-content-secondary mb-3">
                Garis waktu interaktif vaksinasi yang direkomendasikan berdasarkan pedoman wilayah Anda.
              </Text>
              <TouchableOpacity className="flex-row items-center">
                <Text className="font-worksans-semibold text-sm text-primary mr-1">
                  Lihat Jadwal
                </Text>
                <Ionicons name="arrow-forward" size={14} color="#1A6B8A" />
              </TouchableOpacity>
            </Card>

            {articles.slice(1).map((article) => (
              <Card key={article.id} variant="default" padding="medium" className="mb-4">
                <View className="flex-row">
                  <View className="w-16 h-16 rounded-xl bg-primary-50 items-center justify-center mr-3">
                    <Ionicons
                      name={
                        article.category === 'Panduan'
                          ? 'shield-checkmark-outline'
                          : 'fitness-outline'
                      }
                      size={28}
                      color="#1A6B8A"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-poppins-bold text-base text-content-primary mb-1">
                      {article.title}
                    </Text>
                    <Text className="font-worksans text-sm text-content-secondary" numberOfLines={2}>
                      {article.description}
                    </Text>
                    <TouchableOpacity className="mt-2">
                      <Text className="font-worksans-semibold text-sm text-primary">
                        Baca Panduan
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            ))}
          </View>

          <View className="mt-2">
            <Button
              title="Ikuti Kuis Interaktif"
              onPress={() => router.push('/quiz')}
              variant="primary"
              icon={<Ionicons name="clipboard-outline" size={20} color="#FFFFFF" />}
            />
            <View className="h-3" />
            <Button
              title="Daftar Periksa Pemahaman Materi"
              onPress={() => {}}
              variant="outline"
              icon={<Ionicons name="options-outline" size={20} color="#1A6B8A" />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
