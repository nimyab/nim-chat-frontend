import { cn } from '@/utils/cn';
import { Button, Modal, Text, TouchableOpacity, View } from 'react-native';

type GoBackModalProps = {
  modalVisible: boolean;
  title: string;
  acceptTitle: string;
  rejectTitle: string;
  setModalVisible: (flag: boolean) => void;
  confirmBackNavigation: () => void;
};

export const GoBackModal = ({
  modalVisible,
  title,
  acceptTitle,
  rejectTitle,
  setModalVisible,
  confirmBackNavigation,
}: GoBackModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View className="flex-1 justify-center items-center bg-black/30">
        <View className="bg-slate-700 p-5 flex flex-col gap-7 rounded-lg">
          <Text className="text-white font-semibold text-xl">{title}</Text>
          <View className="flex flex-row gap-10">
            <TouchableOpacity
              activeOpacity={0.5}
              className="bg-black/40 rounded-lg p-3 flex-1"
              onPress={confirmBackNavigation}
            >
              <Text className="text-white font-semibold text-xl text-center">
                {acceptTitle}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              className="bg-black/40 rounded-lg p-3 flex-1"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white font-semibold text-xl text-center">
                {rejectTitle}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
