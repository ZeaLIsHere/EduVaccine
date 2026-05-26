import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../src/components/ui/Card';
import { Button } from '../src/components/ui/Button';
import { StarRating } from '../src/components/ui/StarRating';

export default function FeedbackScreen(): React.ReactElement {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  function handleSubmit(): void {
    router.back();
  }

  return (
    <SafeAreaView className="flex-1 bg-surface-secondary">
      <View className="flex-row items-center px-5 py-3">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#1A2B3C" />
        </TouchableOpacity>
        <Text className="font-poppins-bold text-xl text-primary">eduVaccin</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pb-6">
          <Card variant="default" padding="large" className="bg-primary-50">
            <View className="items-center mb-4">
              <Ionicons name="heart-outline" size={48} color="#1A6B8A" />
              <Text className="font-poppins-bold text-xl text-content-primary text-center mt-3">
                Bagaimana penilaian Anda?
              </Text>
              <Text className="font-worksans text-sm text-content-secondary text-center mt-2 px-4">
                Umpan balik Anda membantu kami menciptakan ruang yang lebih baik dan mendukung bagi Anda dan si kecil.
              </Text>
            </View>

            <Text className="font-worksans-semibold text-xs text-content-secondary text-center uppercase tracking-wider mb-3">
              BERI NILAI PENGALAMAN ANDA
            </Text>
            <StarRating rating={rating} onRatingChange={setRating} />

            <View className="mt-6">
              <Text className="font-poppins-semibold text-base text-content-primary mb-2">
                Saran dan Pengalaman
              </Text>
              <View className="bg-white border border-border rounded-input p-4">
                <TextInput
                  value={comment}
                  onChangeText={setComment}
                  placeholder="Beritahu kami apa yang Anda sukai, atau bagaimana kami dapat berkembang..."
                  placeholderTextColor="#8A9BAC"
                  multiline
                  numberOfLines={4}
                  className="font-worksans text-base text-content-primary min-h-[100px]"
                  textAlignVertical="top"
                />
              </View>
            </View>

            <View className="mt-6">
              <Button
                title="Kirim Umpan Balik"
                onPress={handleSubmit}
                variant="primary"
                icon={<Ionicons name="send" size={18} color="#FFFFFF" />}
              />
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
