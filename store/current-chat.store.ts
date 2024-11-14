import { createSelectors } from '@/utils/store-selectors';
import { create } from 'zustand';
import { Message } from '@/type/message';

type CurrentChatStore = {
  chatId: string | null;
  setChatId: (newChatId: string | null) => void;
  messages: Message[];
  resetMessages: () => void;
  addMessage: (message: Message) => void;
};

const useCurrentChatBase = create<CurrentChatStore>((set, get) => ({
  messages: [],
  chatId: null,
  setChatId(newChatId) {
    set(() => ({ chatId: newChatId }));
  },
  resetMessages() {
    set(() => ({ messages: [] }));
  },
  addMessage(message) {
    set(({ messages }) => ({ messages: [message, ...messages] }));
  },
}));

export const useCurrentChat = createSelectors(useCurrentChatBase);
