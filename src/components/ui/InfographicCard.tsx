import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Modal,
  Image,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EducationContent } from '../../types';
import { useResponsive } from '../../utils/useResponsive';

interface InfographicCardProps {
  infographic: EducationContent;
}

export function InfographicCard({ infographic }: InfographicCardProps): React.ReactElement {
  const { isTablet } = useResponsive();
  const [modalVisible, setModalVisible] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const modalFadeAnim = useRef(new Animated.Value(0)).current;

  const thumbnailUrl = infographic.thumbnailUrl ?? infographic.imageUrl ?? '';
  const fullUrl = infographic.imageUrl ?? infographic.thumbnailUrl ?? '';
  const screenWidth = Dimensions.get('window').width;

  function handlePressIn(): void {
    Animated.spring(scaleAnim, { toValue: 0.97, useNativeDriver: true, speed: 30, bounciness: 4 }).start();
  }

  function handlePressOut(): void {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }).start();
  }

  function openModal(): void {
    setModalVisible(true);
    Animated.timing(modalFadeAnim, { toValue: 1, duration: 220, useNativeDriver: true }).start();
  }

  function closeModal(): void {
    Animated.timing(modalFadeAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start(() => {
      setModalVisible(false);
    });
  }

  const thumbnailHeight = isTablet ? 240 : 180;

  return (
    <>
      <Animated.View style={{ transform: [{ scale: scaleAnim }], marginBottom: 16 }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={openModal}
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
          <View style={{ height: thumbnailHeight, backgroundColor: '#E8F4F8' }}>
            {thumbnailUrl ? (
              <Image
                source={{ uri: thumbnailUrl }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            ) : (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="image-outline" size={48} color="#1A6B8A" />
              </View>
            )}

            <View
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                backgroundColor: 'rgba(26, 107, 138, 0.9)',
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}
            >
              <Ionicons name="expand-outline" size={13} color="#FFFFFF" />
              <Text style={{ fontFamily: 'WorkSans_500Medium', fontSize: 11, color: '#FFFFFF', marginLeft: 4 }}>
                Perbesar
              </Text>
            </View>
          </View>

          <View style={{ padding: 14 }}>
            <View
              style={{
                backgroundColor: '#E8F4F8',
                borderRadius: 20,
                paddingHorizontal: 10,
                paddingVertical: 3,
                alignSelf: 'flex-start',
                marginBottom: 6,
              }}
            >
              <Text style={{ fontFamily: 'WorkSans_500Medium', fontSize: 11, color: '#1A6B8A' }}>
                {infographic.category}
              </Text>
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
              {infographic.title}
            </Text>
            {infographic.description ? (
              <Text
                style={{ fontFamily: 'WorkSans_400Regular', fontSize: 13, color: '#5A6B7C' }}
                numberOfLines={2}
              >
                {infographic.description}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
      </Animated.View>

      <Modal visible={modalVisible} transparent animationType="none" onRequestClose={closeModal}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.88)',
            opacity: modalFadeAnim,
          }}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={closeModal}
                style={{
                  position: 'absolute',
                  top: 52,
                  right: 20,
                  zIndex: 10,
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: 20,
                  padding: 8,
                }}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>

              <View style={{ position: 'absolute', top: 52, left: 20, right: 60, zIndex: 10 }}>
                <Text
                  style={{ fontFamily: 'Poppins_600SemiBold', fontSize: 15, color: '#FFFFFF' }}
                  numberOfLines={2}
                >
                  {infographic.title}
                </Text>
              </View>

              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: 100,
                  paddingBottom: 40,
                }}
                showsVerticalScrollIndicator={false}
              >
                <TouchableWithoutFeedback>
                  <View>
                    {fullUrl ? (
                      <Image
                        source={{ uri: fullUrl }}
                        style={{ width: screenWidth - 32, aspectRatio: 0.7 }}
                        resizeMode="contain"
                      />
                    ) : (
                      <View
                        style={{
                          width: screenWidth - 32,
                          height: 400,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Ionicons name="image-outline" size={64} color="rgba(255,255,255,0.4)" />
                        <Text style={{ color: 'rgba(255,255,255,0.5)', marginTop: 12, fontFamily: 'WorkSans_400Regular' }}>
                          Gambar tidak tersedia
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>

              <Text
                style={{
                  position: 'absolute',
                  bottom: 24,
                  alignSelf: 'center',
                  fontFamily: 'WorkSans_400Regular',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                Geser untuk menutup
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </Modal>
    </>
  );
}
