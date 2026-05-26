import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../src/components/ui/Card';
import { Button } from '../src/components/ui/Button';
import { useEducationStore } from '../src/stores/useEducationStore';

export default function QuizScreen(): React.ReactElement {
  const router = useRouter();
  const quizQuestions = useEducationStore((state) => state.quizQuestions);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  function selectAnswer(questionId: string, optionIndex: number): void {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  }

  function handleSubmit(): void {
    router.push('/feedback');
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
              <View className="w-14 h-14 rounded-xl bg-white items-center justify-center mb-3">
                <Ionicons name="help-circle-outline" size={32} color="#1A6B8A" />
              </View>
              <Text className="font-poppins-bold text-xl text-content-primary text-center">
                Pasca-Tes Pengetahuan
              </Text>
              <Text className="font-worksans text-sm text-content-secondary text-center mt-1">
                Mari periksa pemahaman Anda setelah kuis interaktif ini.
              </Text>
            </View>

            {quizQuestions.map((question, qIndex) => (
              <View key={question.id} className="mb-6">
                <Text className="font-poppins-semibold text-base text-content-primary mb-3">
                  {qIndex + 1}. {question.question}
                </Text>
                {question.options.map((option, oIndex) => {
                  const isSelected = answers[question.id] === oIndex;
                  return (
                    <TouchableOpacity
                      key={oIndex}
                      onPress={() => selectAnswer(question.id, oIndex)}
                      activeOpacity={0.7}
                    >
                      <Card
                        variant="default"
                        padding="medium"
                        className="mb-2"
                        style={{
                          borderWidth: isSelected ? 2 : 1,
                          borderColor: isSelected ? '#1A6B8A' : '#E0E8ED',
                          backgroundColor: isSelected ? '#E8F4F8' : '#FFFFFF',
                        }}
                      >
                        <View className="flex-row items-center">
                          <View
                            className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-3 ${
                              isSelected ? 'border-primary bg-primary' : 'border-border'
                            }`}
                          >
                            {isSelected && (
                              <View className="w-2 h-2 rounded-full bg-white" />
                            )}
                          </View>
                          <Text className="font-worksans text-base text-content-primary flex-1">
                            {option}
                          </Text>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}

            <Button
              title="Kirim Tes"
              onPress={handleSubmit}
              variant="primary"
              icon={<Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />}
            />
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
