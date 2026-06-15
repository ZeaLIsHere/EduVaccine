import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Linking } from 'react-native';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EducationContent } from '../../types';
import { useResponsive } from '../../utils/useResponsive';

interface VideoCardProps {
  video: EducationContent;
  onPress?: (video: EducationContent) => void;
}

function getYoutubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

function getYoutubeUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function VideoCard({ video, onPress }: VideoCardProps): React.ReactElement {
  const { isTablet } = useResponsive();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const thumbnailUrl = video.videoId
    ? getYoutubeThumbnail(video.videoId)
    : video.thumbnailUrl ?? video.imageUrl ?? '';

  function handlePressIn(): void {
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, speed: 30, bounciness: 4 }).start();
  }

  function handlePressOut(): void {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }).start();
  }

  function handlePress(): void {
    if (onPress) {
      onPress(video);
      return;
    }
    if (video.videoId) {
      Linking.openURL(getYoutubeUrl(video.videoId));
    }
  }

  const thumbnailHeight = isTablet ? 200 : 160;

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }], marginBottom: 16 }}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.06,
          shadowRadius: 6,
          elevation: 2,
        }}
      >
        <View style={{ height: thumbnailHeight, backgroundColor: '#C5E4ED', position: 'relative' }}>
          {thumbnailUrl ? (
            <Image
              source={{ uri: thumbnailUrl }}
              style={{ width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="videocam-outline" size={48} color="#1A6B8A" />
            </View>
          )}

          <View
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.25)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                backgroundColor: 'rgba(255,255,255,0.92)',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOpacity: 0.2,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              <Ionicons name="play" size={24} color="#1A6B8A" />
            </View>
          </View>

          {video.videoDuration && (
            <View
              style={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                backgroundColor: 'rgba(0,0,0,0.72)',
                borderRadius: 6,
                paddingHorizontal: 6,
                paddingVertical: 2,
              }}
            >
              <Text style={{ fontFamily: 'WorkSans_600SemiBold', fontSize: 11, color: '#FFFFFF' }}>
                {video.videoDuration}
              </Text>
            </View>
          )}
        </View>

        <View style={{ padding: 14 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
            <View
              style={{
                backgroundColor: '#E8F4F8',
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 3,
                marginRight: 8,
              }}
            >
              <Text style={{ fontFamily: 'WorkSans_500Medium', fontSize: 11, color: '#1A6B8A' }}>
                {video.category}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="logo-youtube" size={13} color="#FF0000" />
              <Text style={{ fontFamily: 'WorkSans_400Regular', fontSize: 11, color: '#8A9BAC', marginLeft: 3 }}>
                YouTube
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontFamily: 'Poppins_600SemiBold',
              fontSize: isTablet ? 16 : 14,
              color: '#1A2B3C',
              marginBottom: 4,
            }}
            numberOfLines={2}
          >
            {video.title}
          </Text>

          {video.description ? (
            <Text
              style={{ fontFamily: 'WorkSans_400Regular', fontSize: 13, color: '#5A6B7C' }}
              numberOfLines={2}
            >
              {video.description}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
