import { ChatInput } from '@/components/chat/chat-input/chat-input';
import { MessagesList } from '@/components/chat/messages/messages-list';
import { ChatProvider } from '@/providers/chat-provider';
import { useState } from 'react';
import { View } from 'react-native';

export default function Chat() {
  const [message, setMessage] = useState('');

  return (
    <ChatProvider>
      <View className="flex flex-col justify-between items-center h-full bg-gray-900">
        <MessagesList />
        <ChatInput />
      </View>
    </ChatProvider>
  );
}
