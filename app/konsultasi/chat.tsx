import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  time: string;
  read: boolean;
  imageUrl?: string;
}

export default function ChatScreen(): React.ReactElement {
  const router = useRouter();
  const [inputText, setInputText] = useState('');

  const [messages] = useState<Message[]>([
    {
      id: '1',
      text: 'Halo! Saya dr. Sarah. Ada yang bisa saya bantu terkait jadwal vaksinasi si kecil?',
      isUser: false,
      time: '09:15 AM',
      read: true,
    },
    {
      id: '2',
      text: 'Pagi dok. Saya ingin bertanya tentang vaksin MR. Apakah anak saya yang sedang sedikit batuk boleh tetap divaksin?',
      isUser: true,
      time: '09:17 AM',
      read: true,
    },
    {
      id: '3',
      text: 'Batuk ringan tanpa demam biasanya bukan halangan untuk vaksinasi MR. Namun, sebaiknya kita periksa suhu tubuhnya terlebih dahulu ya.\n\nApakah ada gejala lain seperti sesak napas atau nafsu makan menurun?',
      isUser: false,
      time: '09:18 AM',
      read: true,
    },
  ]);

  function handleSend(): void {
    if (inputText.trim()) {
      setInputText('');
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-4 py-3 bg-white border-b border-border">
        <TouchableOpacity onPress={() => router.back()} className="mr-3">
          <Ionicons name="arrow-back" size={24} color="#1A2B3C" />
        </TouchableOpacity>
        <View className="w-10 h-10 rounded-full bg-primary-50 items-center justify-center mr-3">
          <Ionicons name="person" size={20} color="#1A6B8A" />
        </View>
        <View className="flex-1">
          <Text className="font-poppins-bold text-base text-content-primary">dr. Sarah</Text>
          <Text className="font-worksans-medium text-xs text-content-secondary">
            Spesialis Anak
          </Text>
          <View className="flex-row items-center">
            <View className="w-2 h-2 rounded-full bg-success mr-1" />
            <Text className="font-worksans text-xs text-success">Online</Text>
          </View>
        </View>
        <TouchableOpacity className="mr-3">
          <Ionicons name="videocam-outline" size={24} color="#1A2B3C" />
        </TouchableOpacity>
        <TouchableOpacity className="mr-3">
          <Ionicons name="call-outline" size={22} color="#1A2B3C" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={22} color="#1A2B3C" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          className="flex-1 px-4 py-4"
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              className={`mb-4 ${message.isUser ? 'items-end' : 'items-start'}`}
            >
              <View className="flex-row items-end max-w-[80%]">
                {!message.isUser && (
                  <View className="w-8 h-8 rounded-full bg-primary-50 items-center justify-center mr-2 mb-1">
                    <Ionicons name="person" size={16} color="#1A6B8A" />
                  </View>
                )}
                <View
                  className={`rounded-2xl px-4 py-3 ${
                    message.isUser
                      ? 'bg-primary rounded-br-sm'
                      : 'bg-primary-50 rounded-bl-sm'
                  }`}
                >
                  <Text
                    className={`font-worksans text-base leading-6 ${
                      message.isUser ? 'text-white' : 'text-content-primary'
                    }`}
                  >
                    {message.text}
                  </Text>
                </View>
              </View>
              <View className={`flex-row items-center mt-1 ${message.isUser ? 'mr-0' : 'ml-10'}`}>
                <Text className="font-worksans text-xs text-content-muted">
                  {message.time}
                </Text>
                {message.isUser && message.read && (
                  <Ionicons name="checkmark-done" size={14} color="#1A6B8A" className="ml-1" />
                )}
              </View>
            </View>
          ))}

          <View className="items-start mb-4">
            <View className="w-[70%] h-40 rounded-2xl bg-primary-100 items-center justify-center ml-10 overflow-hidden">
              <Ionicons name="document-text-outline" size={40} color="#1A6B8A" />
              <Text className="font-worksans text-xs text-primary mt-1">Immunization Record</Text>
            </View>
          </View>
        </ScrollView>

        <View className="flex-row items-center px-4 py-3 bg-white border-t border-border">
          <TouchableOpacity className="mr-3">
            <Ionicons name="add-circle-outline" size={28} color="#8A9BAC" />
          </TouchableOpacity>
          <View className="flex-1 flex-row items-center bg-surface-muted rounded-full px-4 py-2.5">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ketik pesan..."
              placeholderTextColor="#8A9BAC"
              className="flex-1 font-worksans text-base text-content-primary"
              onSubmitEditing={handleSend}
            />
          </View>
          <TouchableOpacity
            onPress={handleSend}
            className="ml-3 w-11 h-11 rounded-full bg-primary items-center justify-center"
          >
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
