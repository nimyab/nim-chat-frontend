import { Text, TouchableOpacity } from 'react-native';

import { View } from 'react-native';
import { cn } from '@/utils/cn';
import { ageChatArray, useChatParams } from '@/store/chat-params.store';

export const ChooseYourAge = () => {
  const yourAgeChatIndex = useChatParams.use.yourAgeChatIndex();
  const setYourAgeChatIndex = useChatParams.use.setYourAgeChatIndex();

  const changeYourAgeIndex = (index: number) => {
    if (index === yourAgeChatIndex) return;
    setYourAgeChatIndex(index);
  };

  return (
    <View className="flex-1">
      <Text className="text-slate-300 text-xl">Ваш возраст</Text>
      <View className="flex gap-3">
        {ageChatArray.map((age, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              className={cn(
                'rounded-lg',
                index === yourAgeChatIndex ? 'bg-blue-800' : 'bg-neutral-300'
              )}
              key={index}
              onPress={() => changeYourAgeIndex(index)}
            >
              <Text
                className={cn(
                  'text-center text-xl px-6 py-2',
                  index === yourAgeChatIndex
                    ? 'text-neutral-300'
                    : 'text-slate-800'
                )}
              >
                {age}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
