import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../src/components/ui/Card';
import { Button } from '../src/components/ui/Button';
import { Badge } from '../src/components/ui/Badge';
import { useVaccineStore } from '../src/stores/useVaccineStore';

export default function PemantauanScreen(): React.ReactElement {
  const schedule = useVaccineStore((state) => state.schedule);
  const markVaccineComplete = useVaccineStore((state) => state.markVaccineComplete);

  const timelineData = [
    {
      label: '2 Bulan',
      status: 'completed' as const,
      vaccines: ['Hepatitis B (Dosis 2)', 'Rotavirus (RV)'],
    },
    {
      label: '4 Bulan',
      status: 'upcoming' as const,
      scheduledDate: 'Dijadwalkan untuk 12 Okt 2023',
      vaccines: ['DTaP', 'Polio (IPV)'],
    },
    {
      label: '6 Bulan',
      status: 'overdue' as const,
      vaccines: ['Vaksin Flu (Tahunan)'],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-surface-secondary">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-5 pt-4 pb-6">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-primary-50 items-center justify-center mr-3 overflow-hidden">
                <Ionicons name="happy-outline" size={22} color="#1A6B8A" />
              </View>
              <Text className="font-poppins-bold text-2xl text-primary">eduVaccin</Text>
            </View>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={26} color="#1A2B3C" />
            </TouchableOpacity>
          </View>

          <Text className="font-poppins-bold text-2xl text-primary mb-1">
            Pemantauan & Catatan
          </Text>
          <Text className="font-worksans text-base text-content-secondary mb-6">
            Pantau jadwal vaksinasi dan tahap perkembangan bayi Anda.
          </Text>

          <View className="ml-2">
            {timelineData.map((item, index) => {
              const isCompleted = item.status === 'completed';
              const isOverdue = item.status === 'overdue';
              const isUpcoming = item.status === 'upcoming';

              const nodeColor = isCompleted
                ? '#28A745'
                : isOverdue
                ? '#DC3545'
                : '#8A9BAC';

              const borderColor = isOverdue ? '#DC3545' : 'transparent';

              return (
                <View key={index} className="flex-row mb-5">
                  <View className="items-center mr-4">
                    <View
                      className="w-7 h-7 rounded-full items-center justify-center"
                      style={{ backgroundColor: isCompleted ? '#D4EDDA' : isOverdue ? '#F8D7DA' : '#E8F4F8' }}
                    >
                      {isCompleted ? (
                        <Ionicons name="checkmark-circle" size={20} color="#28A745" />
                      ) : isOverdue ? (
                        <Ionicons name="alert-circle" size={20} color="#DC3545" />
                      ) : (
                        <View className="w-3 h-3 rounded-full bg-content-muted" />
                      )}
                    </View>
                    {index < timelineData.length - 1 && (
                      <View className="w-0.5 flex-1 bg-border mt-1" style={{ minHeight: 80 }} />
                    )}
                  </View>

                  <View className="flex-1">
                    <Card
                      variant="default"
                      padding="large"
                      style={{
                        borderWidth: isOverdue ? 1.5 : 0,
                        borderColor: borderColor,
                      }}
                    >
                      <View className="flex-row items-center justify-between mb-2">
                        <Text className="font-poppins-bold text-xl text-content-primary">
                          {item.label}
                        </Text>
                        {isCompleted && (
                          <Badge
                            text="Selesai"
                            variant="success"
                            icon={<Ionicons name="checkmark" size={14} color="#28A745" />}
                          />
                        )}
                        {isUpcoming && <Badge text="Mendatang" variant="muted" />}
                        {isOverdue && <Badge text="Perlu Tindakan" variant="danger" />}
                      </View>

                      {item.scheduledDate && (
                        <Text className="font-worksans text-sm text-content-secondary mb-2">
                          {item.scheduledDate}
                        </Text>
                      )}

                      {item.vaccines.map((vaccine, vIndex) => (
                        <View key={vIndex} className="flex-row items-center mb-1.5">
                          {isCompleted ? (
                            <View className="w-2.5 h-2.5 rounded-full bg-primary mr-2.5" />
                          ) : isOverdue ? (
                            <View className="w-5 h-5 rounded border-2 border-danger mr-2" />
                          ) : (
                            <View className="w-5 h-5 rounded border-2 border-border mr-2" />
                          )}
                          <Text className="font-worksans text-base text-content-primary">
                            {vaccine}
                          </Text>
                        </View>
                      ))}

                      {isUpcoming && (
                        <View className="mt-3">
                          <Button
                            title="Tandai Selesai"
                            onPress={() => {}}
                            variant="primary"
                          />
                        </View>
                      )}

                      {isOverdue && (
                        <View className="mt-3">
                          <Button
                            title="Jadwalkan Janji Temu"
                            onPress={() => {}}
                            variant="outline"
                          />
                        </View>
                      )}
                    </Card>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
