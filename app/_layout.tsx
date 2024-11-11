import { Stack, useNavigation } from 'expo-router';

import '../global.css';
import { Color } from '@/consts/colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, Modal, Text, View } from 'react-native';
import { useState } from 'react';
import { GoBackModal } from '@/components/modals/go-back-modals';
import { SocketProvider } from '@/providers/socket-provider';

export default function RootLayout() {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  const handleBackPress = () => {
    setModalVisible(true);
  };

  const confirmBackNavigation = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  return (
    <SocketProvider url={process.env.EXPO_PUBLIC_API_URL ?? ''}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            title: 'Nim Chat',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: Color.headerColor },
            headerTitleStyle: {
              color: Color.headerTitleColor,
              fontWeight: '900',
            },
          }}
        />
        <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
        <Stack.Screen
          name="chat"
          options={{
            title: 'Nim Chat',
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: Color.headerColor },
            headerTitleStyle: {
              color: Color.headerTitleColor,
              fontWeight: '900',
            },
            headerLeft: () => (
              <Ionicons
                name="arrow-back-sharp"
                color={Color.headerTitleColor}
                size={24}
                onPress={handleBackPress}
              />
            ),
          }}
        />
      </Stack>

      <GoBackModal
        acceptTitle="Да"
        rejectTitle="Нет"
        confirmBackNavigation={confirmBackNavigation}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        title="Вы уверены что хотите выйти из чата?"
      />
    </SocketProvider>
  );
}
