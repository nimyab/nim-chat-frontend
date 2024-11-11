import { Input } from '@/components/ui/input';
import { Color } from '@/consts/colors';
import { chatContext } from '@/providers/chat-provider';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useContext, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

export const ChatInput = () => {
  const [message, setMessage] = useState('');
  const { sendChatMessage } = useContext(chatContext);

  const handleSendMessage = () => {
    const textMessage = message.trim();
    if (!!textMessage) {
      sendChatMessage({ text: textMessage });
    }
    setMessage('');
  };

  return (
    <View className="flex-row w-full gap-3 p-3 pr-4 bg-gray-800 items-center">
      <Input
        className="flex-1 border-0 text-white"
        placeholder="Напишите сообщение..."
        placeholderTextColor={Color.headerTitleColor}
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity onPress={handleSendMessage}>
        <Ionicons name="send-sharp" color={Color.headerTitleColor} size={24} />
      </TouchableOpacity>
    </View>
  );
};
