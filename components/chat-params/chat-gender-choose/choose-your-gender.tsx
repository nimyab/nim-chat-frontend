import { genderChatArray, useChatParams } from '@/store/chat-params.store';
import { cn } from '@/utils/cn';
import { Text, TouchableOpacity, View } from 'react-native';

export const ChooseYourGender = () => {
  const yourGenderChatIndex = useChatParams.use.yourGenderChatIndex();
  const setYourGenderChatIndex = useChatParams.use.setYourGenderChatIndex();

  const changeYourGenderIndex = (index: number) => {
    if (index === yourGenderChatIndex) return;
    setYourGenderChatIndex(index);
  };

  return (
    <View className="flex-1">
      <Text className="text-slate-300 text-xl">Ваш пол</Text>
      <View className="flex gap-3">
        {genderChatArray.map((gender, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              className={cn(
                'rounded-lg',
                index === yourGenderChatIndex ? 'bg-blue-800' : 'bg-neutral-300'
              )}
              key={index}
              onPress={() => changeYourGenderIndex(index)}
            >
              <Text
                className={cn(
                  'text-center text-xl px-6 py-2',
                  index === yourGenderChatIndex
                    ? 'text-neutral-300'
                    : 'text-slate-800'
                )}
              >
                {gender}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
