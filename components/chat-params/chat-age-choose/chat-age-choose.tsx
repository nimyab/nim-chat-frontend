import { View } from 'react-native';
import { ChooseYourAge } from './choose-your-age';
import { ChoosePartnerAge } from './choose-partner-age';

export const ChatAgeChoose = () => {
  return (
    <View className="flex flex-col gap-2">
      <View className="flex flex-row gap-3">
        <ChooseYourAge />
        <ChoosePartnerAge />
      </View>
    </View>
  );
};
