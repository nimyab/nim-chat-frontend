import { ChatInput } from '@/components/chat/chat-input/chat-input';
import { MessagesList } from '@/components/chat/messages/messages-list';
import { ChatProvider } from '@/providers/chat-provider';
import { useCurrentChat } from '@/store/current-chat.store';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { LoadingDots } from '@/components/ui/loading-dots';

export default function Chat() {
  const chatId = useCurrentChat.use.chatId();
  return (
    <ChatProvider>
      {chatId ? (
        <View className="flex flex-col justify-between items-center h-full bg-gray-900">
          <MessagesList />
          <ChatInput />
        </View>
      ) : (
        <View className="flex flex-col justify-center items-center bg-gray-900 h-full gap-3">
          <Text className="font-bold text-xl text-white">
            Ищем вам собеседника
          </Text>
          <LoadingDots />
        </View>
      )}
    </ChatProvider>
  );
}
