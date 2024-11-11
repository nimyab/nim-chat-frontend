import { createSelectors } from '@/utils/store-selectors';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const topicChatArray = ['Общение', 'Флирт', 'Случайное'];
export const genderChatArray = ['Мужской', 'Женский', 'Не важно'];
export const ageChatArray = [
  'до 17',
  'от 18 до 21',
  'от 22 до 25',
  'от 26 до 30',
  'от 31 до 35',
  'старше 36',
];

type ChatParamsStore = {
  topicChatIndex: number;
  yourGenderChatIndex: number;
  partnerGenderChatIndex: number;
  yourAgeChatIndex: number;
  partnerAgeChatIndexes: number[];

  setTopicChatIndex: (index: number) => void;
  setYourGenderChatIndex: (index: number) => void;
  setPartnerGenderChatIndex: (index: number) => void;
  setYourAgeChatIndex: (index: number) => void;
  setPartnerAgeChatIndexes: (index: number) => void;
};

const useChatParamsBase = create(
  persist<ChatParamsStore>(
    (set, get) => ({
      topicChatIndex: 0,
      yourGenderChatIndex: 0,
      partnerGenderChatIndex: 0,
      yourAgeChatIndex: 0,
      partnerAgeChatIndexes: [0],
      setPartnerAgeChatIndexes(index) {
        const { partnerAgeChatIndexes } = get();
        if (
          partnerAgeChatIndexes.find((elem) => elem === index) !== undefined
        ) {
          if (partnerAgeChatIndexes.length === 1) return;
          else
            set(() => ({
              partnerAgeChatIndexes: partnerAgeChatIndexes.filter(
                (elem) => elem !== index
              ),
            }));
        } else {
          set(() => ({
            partnerAgeChatIndexes: [
              ...partnerAgeChatIndexes.filter((elem) => elem !== index),
              index,
            ],
          }));
        }
      },
      setPartnerGenderChatIndex(index) {
        const { partnerGenderChatIndex } = get();
        if (index === partnerGenderChatIndex) return;
        set(() => ({ partnerGenderChatIndex: index }));
      },
      setTopicChatIndex(index) {
        const { topicChatIndex } = get();
        if (index === topicChatIndex) return;
        set(() => ({ topicChatIndex: index }));
      },
      setYourAgeChatIndex(index) {
        const { yourAgeChatIndex } = get();
        if (index === yourAgeChatIndex) return;
        set(() => ({ yourAgeChatIndex: index }));
      },
      setYourGenderChatIndex(index) {
        const { yourGenderChatIndex } = get();
        if (index === yourGenderChatIndex) return;
        set(() => ({ yourGenderChatIndex: index }));
      },
    }),
    { name: 'chat-params', storage: createJSONStorage(() => AsyncStorage) }
  )
);

export const useChatParams = createSelectors(useChatParamsBase);
