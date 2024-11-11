import { ChatAgeChoose } from '@/components/chat-params/chat-age-choose/chat-age-choose';
import { ChatGenderChoose } from '@/components/chat-params/chat-gender-choose/chat-gender-choose';
import { ChatTopicChoose } from '@/components/chat-params/chat-topic-choose';
import { StartChatButton } from '@/components/chat-params/start-chat-button';
import { View } from 'react-native';

export default function ChatParams() {
  return (
    <View className="flex flex-col justify-between items-center h-full px-2 py-3 bg-gray-900">
      <View className="flex flex-col w-full gap-3">
        <ChatTopicChoose />
        <ChatAgeChoose />
        <ChatGenderChoose />
      </View>
      {/* <View>theme</View> */}
      <StartChatButton title="Начать чат" />
    </View>
  );
}
