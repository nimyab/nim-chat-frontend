import { TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { cn } from '@/utils/cn';
import { ageChatArray, useChatParams } from '@/store/chat-params.store';

export const ChoosePartnerAge = () => {
  const setPartnerAgeChatIndexes = useChatParams.use.setPartnerAgeChatIndexes();
  const partnerAgeChatIndexes = useChatParams.use.partnerAgeChatIndexes();

  const changePartnerAgeIndex = (index: number) => {
    setPartnerAgeChatIndexes(index);
  };

  return (
    <View className="flex-1">
      <Text className="text-slate-300 text-xl">Возраст собеседника</Text>
      <View className="flex flex-col gap-3">
        {ageChatArray.map((age, index) => {
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              className={cn(
                'rounded-lg',
                partnerAgeChatIndexes.includes(index)
                  ? 'bg-blue-800'
                  : 'bg-neutral-300'
              )}
              key={index}
              onPress={() => changePartnerAgeIndex(index)}
            >
              <Text
                className={cn(
                  'text-center text-xl px-6 py-2',
                  partnerAgeChatIndexes.includes(index)
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
