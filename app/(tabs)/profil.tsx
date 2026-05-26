import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../../src/components/ui/Card';
import { Button } from '../../src/components/ui/Button';
import { Input } from '../../src/components/ui/Input';
import { Tag } from '../../src/components/ui/Tag';
import { useBabyStore } from '../../src/stores/useBabyStore';
import { useVaccineStore } from '../../src/stores/useVaccineStore';

export default function ProfilScreen(): React.ReactElement {
  const baby = useBabyStore((state) => state.baby);
  const schedule = useVaccineStore((state) => state.schedule);

  const [name, setName] = useState(baby?.name || 'Leo James');
  const [birthDate, setBirthDate] = useState('08/15/2023');
  const [gender, setGender] = useState('Laki-laki');
  const [weight, setWeight] = useState(String(baby?.weight || '7.2'));
  const [height, setHeight] = useState(String(baby?.height || '65.5'));
  const [vaccineHistory, setVaccineHistory] = useState<string[]>(
    baby?.vaccineHistory || ['BCG (Lahir)', 'Hep B (Dosis 1)', 'DPT (2bln)']
  );
  const [newVaccine, setNewVaccine] = useState('');

  const prediksiJadwal = [
    {
      status: 'overdue' as const,
      label: 'JATUH TEMPO MINGGU INI (6 BULAN)',
      vaccines: 'DPT, IPV, Hep B, RV',
      description: 'Difteri, Tetanus, Pertusis, Polio, Hepatitis B, Rotavirus.',
    },
    {
      status: 'upcoming' as const,
      label: 'MENDATANG (12 BULAN)',
      vaccines: 'MMR, Varicella, Hep A',
      description: '',
    },
    {
      status: 'future' as const,
      label: 'MASA DEPAN (15 BULAN)',
      vaccines: 'DPT (Dosis 4)',
      description: '',
    },
  ];

  function handleRemoveVaccine(index: number): void {
    setVaccineHistory((prev) => prev.filter((_, i) => i !== index));
  }

  function handleAddVaccine(): void {
    if (newVaccine.trim()) {
      setVaccineHistory((prev) => [...prev, newVaccine.trim()]);
      setNewVaccine('');
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-surface-secondary">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-accent items-center justify-center mr-3">
                <Ionicons name="happy-outline" size={22} color="#1A6B8A" />
              </View>
              <Text className="font-poppins-bold text-2xl text-primary">eduVaccin</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={26} color="#1A2B3C" />
            </TouchableOpacity>
          </View>

          <Text className="font-poppins-bold text-2xl text-content-primary mt-2">
            Profil Si Kecil
          </Text>
          <Text className="font-worksans text-base text-content-secondary mb-5">
            Kelola detail buah hati Anda dan pantau perjalanan kesehatannya.
          </Text>

          <Card variant="default" padding="large" className="mb-5">
            <Input label="Nama Bayi" value={name} onChangeText={setName} />
            <Input
              label="Tanggal Lahir"
              value={birthDate}
              onChangeText={setBirthDate}
              icon={<Ionicons name="calendar-outline" size={20} color="#8A9BAC" />}
            />

            <View className="mb-4">
              <Text className="font-worksans-medium text-sm text-content-secondary mb-1.5">
                Jenis Kelamin
              </Text>
              <TouchableOpacity className="flex-row items-center justify-between bg-surface border border-border rounded-input px-4 py-3">
                <Text className="font-worksans text-base text-content-primary">{gender}</Text>
                <Ionicons name="chevron-down" size={20} color="#8A9BAC" />
              </TouchableOpacity>
            </View>

            <Input
              label="Berat Badan"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              unit="kg"
            />
            <Input
              label="Tinggi Badan"
              value={height}
              onChangeText={setHeight}
              keyboardType="numeric"
              unit="cm"
            />

            <Text className="font-worksans-medium text-sm text-content-secondary mb-2">
              Riwayat Imunisasi Sebelumnya
            </Text>
            <View className="flex-row flex-wrap mb-3">
              {vaccineHistory.map((vaccine, index) => (
                <Tag
                  key={index}
                  text={vaccine}
                  onRemove={() => handleRemoveVaccine(index)}
                />
              ))}
            </View>
            <View className="flex-row items-center bg-surface border border-border rounded-input px-4 py-2 mb-5">
              <TextInput
                value={newVaccine}
                onChangeText={setNewVaccine}
                placeholder="Ketik vaksin dan tekan enter"
                placeholderTextColor="#8A9BAC"
                className="flex-1 font-worksans text-base text-content-primary"
                onSubmitEditing={handleAddVaccine}
              />
              <TouchableOpacity onPress={handleAddVaccine}>
                <Ionicons name="add-circle-outline" size={28} color="#1A6B8A" />
              </TouchableOpacity>
            </View>

            <Button title="Simpan Data" onPress={() => {}} variant="primary" />
            <View className="h-3" />
            <Button title="Perbarui Data" onPress={() => {}} variant="outline" />
          </Card>

          <Card variant="default" padding="large" className="bg-primary-50">
            <View className="flex-row items-center mb-3">
              <Ionicons name="calendar" size={22} color="#1A6B8A" />
              <Text className="font-poppins-bold text-xl text-content-primary ml-2">
                Prediksi Jadwal
              </Text>
            </View>
            <Text className="font-worksans text-sm text-content-secondary mb-4">
              Berdasarkan usia Leo (6 bulan), berikut adalah rekomendasi imunisasi mendatang.
            </Text>

            <View className="border-l-2 border-primary-200 ml-2 pl-5">
              {prediksiJadwal.map((item, index) => {
                const dotColor =
                  item.status === 'overdue'
                    ? '#DC3545'
                    : item.status === 'upcoming'
                    ? '#1A6B8A'
                    : '#8A9BAC';

                return (
                  <View key={index} className="mb-5 relative">
                    <View
                      className="absolute -left-[27px] top-1 w-3 h-3 rounded-full"
                      style={{ backgroundColor: dotColor }}
                    />
                    <Text
                      className="font-worksans-semibold text-xs uppercase tracking-wider mb-1.5"
                      style={{ color: dotColor }}
                    >
                      {item.label}
                    </Text>
                    <Card variant="outlined" padding="medium">
                      <Text className="font-poppins-semibold text-base text-content-primary">
                        {item.vaccines}
                      </Text>
                      {item.description ? (
                        <Text className="font-worksans text-sm text-content-secondary mt-1">
                          {item.description}
                        </Text>
                      ) : null}
                    </Card>
                  </View>
                );
              })}
            </View>

            <TouchableOpacity className="flex-row items-center justify-center mt-2">
              <Text className="font-worksans-semibold text-sm text-primary mr-1">
                Lihat Jadwal Lengkap
              </Text>
              <Ionicons name="arrow-forward" size={16} color="#1A6B8A" />
            </TouchableOpacity>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
