import { createSelectors } from '@/utils/store-selectors';
import { create } from 'zustand';
import { Message } from '@/type/message';

type CurrentChatStore = {
  messages: Message[];
  addMessage: (message: Message) => void;
};

const useCurrentChatBase = create<CurrentChatStore>((set, get) => ({
  messages: [{ id: '1', sender: '123', text: 'text' }],
  addMessage(message) {
    set(({ messages }) => ({ messages: [message, ...messages] }));
  },
}));

export const useCurrentChat = createSelectors(useCurrentChatBase);
