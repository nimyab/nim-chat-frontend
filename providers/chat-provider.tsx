import { SOCKET_EVENTS } from '@/socket/socket.events';
import { SendMessageType } from '@/socket/types';
import { useCurrentChat } from '@/store/current-chat.store';
import { Message } from '@/type/message';
import { createContext, useContext, useEffect, useMemo } from 'react';
import { socketContext } from './socket-provider';
import { useChatParams } from '@/store/chat-params.store';

type ChatContextData = {
  sendChatMessage: (data: SendMessageType) => void;
};

export const chatContext = createContext({} as ChatContextData);

type ChatProviderProps = {
  children?: React.ReactNode;
};

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const { socket, searchChat, exitOnChat, stopSearchChat } =
    useContext(socketContext);

  const topicChatIndex = useChatParams.use.topicChatIndex();
  const partnerAgeChatIndexes = useChatParams.use.partnerAgeChatIndexes();
  const partnerGenderChatIndex = useChatParams.use.partnerGenderChatIndex();
  const yourAgeChatIndex = useChatParams.use.yourAgeChatIndex();
  const yourGenderChatIndex = useChatParams.use.yourGenderChatIndex();

  const addMessage = useCurrentChat.use.addMessage();
  const chatId = useCurrentChat.use.chatId();

  const sendChatMessage = (data: SendMessageType) => {
    if (!socket) return;
    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, data);
  };

  useEffect(() => {
    if (!socket) return;

    searchChat({
      topicChatIndex,
      partnerAgeChatIndexes,
      partnerGenderChatIndex,
      yourAgeChatIndex,
      yourGenderChatIndex,
    });

    socket.on(SOCKET_EVENTS.SEND_MESSAGE, (message: Message) => {
      addMessage(message);
    });

    return () => {
      if (chatId) exitOnChat({ chatId });
      else stopSearchChat();

      socket.off(SOCKET_EVENTS.SEND_MESSAGE);
    };
  }, [socket]);

  const contextValue = useMemo(() => ({ sendChatMessage }), [socket]);

  return (
    <chatContext.Provider value={contextValue}>{children}</chatContext.Provider>
  );
};
