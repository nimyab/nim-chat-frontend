import { socketContext } from '@/providers/socket-provider';
import { useCurrentChat } from '@/store/current-chat.store';
import { useContext } from 'react';
import { FlatList, View } from 'react-native';
import { Message } from './message';

export const MessagesList = () => {
  const messages = useCurrentChat.use.messages();
  const { senderId } = useContext(socketContext);

  return (
    <View className="flex-1 p-3 w-full">
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <Message message={item} senderId={senderId} />
        )}
      />
    </View>
  );
};
