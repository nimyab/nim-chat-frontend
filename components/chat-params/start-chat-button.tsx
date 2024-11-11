import { useChatParams } from '@/store/chat-params.store';
import { Link } from 'expo-router';
import { Text, TouchableOpacity } from 'react-native';

type StartChatButtonProps = {
  title: string;
};

export const StartChatButton = ({ title }: StartChatButtonProps) => {
  const handleStartChat = () => {
    console.log('start chat');
  };

  return (
    <>
      <Link
        href="/chat"
        className="bg-inherit border-green-500/70 hover:border-green-500 rounded-lg w-full border-2 text-green-500/70 hover:text-green-500 text-center p-2 font-semibold text-xl"
      >
        {title}
      </Link>
      {/* <TouchableOpacity
        onPress={handleStartChat}
        className="bg-inherit border-green-500/70 hover:border-green-500 rounded-lg w-full border-2"
      >
        <Text className="text-green-500/70 hover:text-green-500 text-center p-2 font-semibold text-xl">
          {title}
        </Text>
      </TouchableOpacity> */}
    </>
  );
};
