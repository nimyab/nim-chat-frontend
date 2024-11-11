import { View } from 'react-native';
import { ChoosePartnerGender } from './choose-partner-gender';
import { ChooseYourGender } from './choose-your-gender';

export const ChatGenderChoose = () => {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row gap-3">
        <ChooseYourGender />
        <ChoosePartnerGender />
      </View>
    </View>
  );
};
