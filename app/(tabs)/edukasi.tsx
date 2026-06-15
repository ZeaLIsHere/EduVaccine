import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../src/components/ui/Card';
import { TabSwitcher } from '../../src/components/ui/TabSwitcher';
import { Button } from '../../src/components/ui/Button';
import { AppBar } from '../../src/components/ui/AppBar';
import { VideoCard } from '../../src/components/ui/VideoCard';
import { InfographicCard } from '../../src/components/ui/InfographicCard';
import { useEducationStore } from '../../src/stores/useEducationStore';
import { useResponsive } from '../../src/utils/useResponsive';

export default function EdukasiScreen(): React.ReactElement {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const { isTablet, px } = useResponsive();

  const articles = useEducationStore((state) => state.articles);
  const videos = useEducationStore((state) => state.videos);
  const infographics = useEducationStore((state) => state.infographics);
  const featuredContent = useEducationStore((state) => state.featuredContent);
  const isLoading = useEducationStore((state) => state.isLoading);
  const isLoadingMore = useEducationStore((state) => state.isLoadingMore);
  const hasMoreArticles = useEducationStore((state) => state.hasMoreArticles);
  const hasMoreVideos = useEducationStore((state) => state.hasMoreVideos);
  const hasMoreInfographics = useEducationStore((state) => state.hasMoreInfographics);

  const fetchArticles = useEducationStore((state) => state.fetchArticles);
  const fetchVideos = useEducationStore((state) => state.fetchVideos);
  const fetchInfographics = useEducationStore((state) => state.fetchInfographics);
  const fetchFeatured = useEducationStore((state) => state.fetchFeatured);
  const loadMoreArticles = useEducationStore((state) => state.loadMoreArticles);
  const loadMoreVideos = useEducationStore((state) => state.loadMoreVideos);
  const loadMoreInfographics = useEducationStore((state) => state.loadMoreInfographics);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 420, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, speed: 12, bounciness: 4 }),
    ]).start();
    fetchFeatured();
    fetchArticles();
  }, []);

  useEffect(() => {
    if (activeTab === 0) fetchArticles();
    else if (activeTab === 1) fetchInfographics();
    else if (activeTab === 2) fetchVideos();
  }, [activeTab]);

  function handleLoadMore(): void {
    if (activeTab === 0) loadMoreArticles();
    else if (activeTab === 1) loadMoreInfographics();
    else if (activeTab === 2) loadMoreVideos();
  }

  const hasMore =
    activeTab === 0 ? hasMoreArticles :
    activeTab === 1 ? hasMoreInfographics :
    hasMoreVideos;

  const featuredHeight = isTablet ? 260 : 192;
  const tabs = ['Artikel', 'Infografis', 'Video'];

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
            className="font-poppins-bold text-primary mb-1"
          >
            Edukasi Interaktif
          </Text>
          <Text
            style={{ fontSize: isTablet ? 16 : 14 }}
            className="font-worksans text-content-secondary mb-5"
          >
            Jelajahi panduan lengkap kami untuk menjaga si kecil tetap aman dan sehat.
          </Text>

          <TabSwitcher tabs={tabs} activeIndex={activeTab} onTabPress={setActiveTab} />

          <View className="mt-5">

            {activeTab === 0 && (
              <>
                {featuredContent && (
                  <Card variant="default" padding="none" className="mb-5 overflow-hidden">
                    <View style={{ height: featuredHeight }} className="bg-primary-100 relative">
                      <View className="absolute inset-0 bg-primary-200 items-center justify-center">
                        <Ionicons name="medical" size={isTablet ? 80 : 60} color="#1A6B8A" />
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
                        {featuredContent.readTime && (
                          <Text className="font-worksans text-xs text-content-muted">
                            {featuredContent.readTime}
                          </Text>
                        )}
                      </View>
                      <Text
                        style={{ fontSize: isTablet ? 20 : 17 }}
                        className="font-poppins-bold text-content-primary mb-1"
                      >
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
                    <Ionicons name="calendar" size={isTablet ? 28 : 24} color="#1A6B8A" />
                  </View>
                  <Text
                    style={{ fontSize: isTablet ? 19 : 17 }}
                    className="font-poppins-bold text-content-primary mb-1"
                  >
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

                {isLoading ? (
                  <ActivityIndicator size="large" color="#1A6B8A" style={{ marginVertical: 24 }} />
                ) : (
                  <View className={isTablet ? 'flex-row flex-wrap justify-between' : ''}>
                    {articles.slice(1).map((article) => (
                      <Card
                        key={article.id}
                        variant="default"
                        padding="medium"
                        className="mb-4"
                        style={isTablet ? { width: '48%' } : undefined}
                      >
                        <View className="flex-row">
                          <View className="w-16 h-16 rounded-xl bg-primary-50 items-center justify-center mr-3">
                            <Ionicons
                              name={article.category === 'Panduan' ? 'shield-checkmark-outline' : 'fitness-outline'}
                              size={isTablet ? 32 : 28}
                              color="#1A6B8A"
                            />
                          </View>
                          <View className="flex-1">
                            <Text
                              style={{ fontSize: isTablet ? 16 : 14 }}
                              className="font-poppins-bold text-content-primary mb-1"
                            >
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
                )}
              </>
            )}

            {activeTab === 1 && (
              <>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#1A6B8A" style={{ marginVertical: 48 }} />
                ) : infographics.length === 0 ? (
                  <View className="items-center py-16">
                    <Ionicons name="images-outline" size={52} color="#C5E4ED" />
                    <Text className="font-poppins-semibold text-base text-content-muted mt-4">
                      Belum ada infografis
                    </Text>
                    <Text className="font-worksans text-sm text-content-muted mt-1 text-center">
                      Infografis akan ditampilkan di sini setelah tersedia.
                    </Text>
                  </View>
                ) : (
                  <View className={isTablet ? 'flex-row flex-wrap justify-between' : ''}>
                    {infographics.map((item) => (
                      <View key={item.id} style={isTablet ? { width: '48%' } : undefined}>
                        <InfographicCard infographic={item} />
                      </View>
                    ))}
                  </View>
                )}
              </>
            )}

            {activeTab === 2 && (
              <>
                {isLoading ? (
                  <ActivityIndicator size="large" color="#1A6B8A" style={{ marginVertical: 48 }} />
                ) : videos.length === 0 ? (
                  <View className="items-center py-16">
                    <Ionicons name="videocam-outline" size={52} color="#C5E4ED" />
                    <Text className="font-poppins-semibold text-base text-content-muted mt-4">
                      Belum ada video
                    </Text>
                    <Text className="font-worksans text-sm text-content-muted mt-1 text-center">
                      Video edukasi akan ditampilkan di sini setelah tersedia.
                    </Text>
                  </View>
                ) : (
                  <View className={isTablet ? 'flex-row flex-wrap justify-between' : ''}>
                    {videos.map((video) => (
                      <View key={video.id} style={isTablet ? { width: '48%' } : undefined}>
                        <VideoCard video={video} />
                      </View>
                    ))}
                  </View>
                )}
              </>
            )}

            {hasMore && (
              <TouchableOpacity
                onPress={handleLoadMore}
                disabled={isLoadingMore}
                className="flex-row items-center justify-center py-3 mt-2 mb-4 border border-border rounded-button bg-white"
              >
                {isLoadingMore ? (
                  <ActivityIndicator size="small" color="#1A6B8A" />
                ) : (
                  <>
                    <Ionicons name="chevron-down" size={18} color="#1A6B8A" />
                    <Text className="font-worksans-semibold text-sm text-primary ml-2">
                      Muat Lebih Banyak
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            )}

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
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
