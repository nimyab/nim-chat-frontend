import { genderChatArray, useChatParams } from '@/store/chat-params.store';
import { cn } from '@/utils/cn';
import { Text, TouchableOpacity, View } from 'react-native';

export const ChoosePartnerGender = () => {
  const partnerGenderChatIndex = useChatParams.use.partnerGenderChatIndex();
  const setPartnerGenderChatIndex =
    useChatParams.use.setPartnerGenderChatIndex();

  const changeYourGenderIndex = (index: number) => {
    if (index === partnerGenderChatIndex) return;
    setPartnerGenderChatIndex(index);
  };

  return (
    <View className="flex-1">
      <Text className="text-slate-300 text-xl">Пол собеседника</Text>
      <View className="flex gap-3">
        {genderChatArray.map((gender, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              className={cn(
                'rounded-lg',
                index === partnerGenderChatIndex
                  ? 'bg-blue-800'
                  : 'bg-neutral-300'
              )}
              key={index}
              onPress={() => changeYourGenderIndex(index)}
            >
              <Text
                className={cn(
                  'text-center text-xl px-6 py-2',
                  index === partnerGenderChatIndex
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
