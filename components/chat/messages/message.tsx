import { Message as MessageType } from '@/type/message';
import { cn } from '@/utils/cn';
import { Text, View } from 'react-native';

type MessageProps = {
  senderId: string | undefined;
  message: MessageType;
};

export const Message = ({ message, senderId }: MessageProps) => {
  return (
    <View
      className={cn(
        'w-full flex-row bg-inherit',
        message.sender === senderId ? 'justify-end' : 'justify-start'
      )}
    >
      <View
        className={cn(
          'rounded-lg w-2/3 px-4 py-2',
          message.sender === senderId ? 'bg-sky-900' : 'bg-slate-800'
        )}
      >
        <Text className="text-white text-lg">{message.text}</Text>
      </View>
    </View>
  );
};
