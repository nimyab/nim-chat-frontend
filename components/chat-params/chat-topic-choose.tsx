import { TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { cn } from '@/utils/cn';
import { topicChatArray, useChatParams } from '@/store/chat-params.store';

export const ChatTopicChoose = () => {
  const topicChatIndex = useChatParams.use.topicChatIndex();
  const setTopicChatIndex = useChatParams.use.setTopicChatIndex();

  const changeTopicIndex = (index: number) => {
    if (index === topicChatIndex) return;
    setTopicChatIndex(index);
  };

  return (
    <View className="flex flex-col">
      <Text className="text-slate-300 text-xl">Тема общения</Text>
      <View className="flex flex-row w-full gap-3">
        {topicChatArray.map((topic, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              className={cn(
                'flex-1 rounded-lg',
                index === topicChatIndex ? 'bg-blue-800' : 'bg-neutral-300'
              )}
              key={index}
              onPress={() => changeTopicIndex(index)}
            >
              <Text
                className={cn(
                  'text-center text-xl px-6 py-2',
                  index === topicChatIndex
                    ? 'text-neutral-300'
                    : 'text-slate-800'
                )}
              >
                {topic}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
