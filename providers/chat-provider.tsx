import { SOCKET_EVENTS } from '@/socket/socket.events';
import { SendMessageType } from '@/socket/types';
import { useCurrentChat } from '@/store/current-chat.store';
import { Message } from '@/type/message';
import { createContext, useContext, useEffect, useMemo } from 'react';
import { socketContext } from './socket-provider';

type ChatContextData = {
  sendChatMessage: (data: SendMessageType) => void;
};

export const chatContext = createContext({} as ChatContextData);

type ChatProviderProps = {
  children?: React.ReactNode;
};

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const { socket } = useContext(socketContext);

  const addMessage = useCurrentChat.use.addMessage();

  const sendChatMessage = (data: SendMessageType) => {
    if (!socket) return;
    socket.emit(SOCKET_EVENTS.SEND_MESSAGE, data);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on(SOCKET_EVENTS.SEND_MESSAGE, (message: Message) => {
      addMessage(message);
    });

    return () => {
      socket.emit(SOCKET_EVENTS.EXIT_ON_CHAT)
      socket.off(SOCKET_EVENTS.SEND_MESSAGE);
    };
  }, [socket]);

  const contextValue = useMemo(() => ({ sendChatMessage }), [sendChatMessage]);

  return (
    <chatContext.Provider value={contextValue}>{children}</chatContext.Provider>
  );
};
