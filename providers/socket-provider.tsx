import { Socket } from 'socket.io-client';
import { useSocket } from '@/socket/hooks/use-socket';
import { createContext, useCallback, useEffect, useMemo } from 'react';
import { SOCKET_EVENTS } from '@/socket/socket.events';
import { SearchChatRequest } from '@/socket/types';
import { useCurrentChat } from '@/store/current-chat.store';

type SocketContextData = {
  socket: Socket | undefined;
  senderId: string | undefined;
  searchChat: (data: SearchChatRequest) => void;
  exitOnChat: (data: { chatId: string }) => void;
  stopSearchChat: () => void;
};

export const socketContext = createContext({} as SocketContextData);

type SocketProviderProps = {
  /**
   * backend socket.io url
   */
  url: string;
  children?: React.ReactNode;
};

export const SocketProvider = ({ url, children }: SocketProviderProps) => {
  const { socket } = useSocket({ url });
  const resetMessages = useCurrentChat.use.resetMessages();
  const setChatId = useCurrentChat.use.setChatId();

  const searchChat = (data: SearchChatRequest) => {
    if (!socket) return;
    socket.emit(SOCKET_EVENTS.SEARCH_CHAT, data);
  };

  const exitOnChat = (data: { chatId: string }) => {
    if (!socket) return;
    socket.emit(SOCKET_EVENTS.STOP_SEARCH_CHAT, data);
  };

  const stopSearchChat = () => {
    if (!socket) return;
    socket.emit(SOCKET_EVENTS.STOP_SEARCH_CHAT);
  };

  useEffect(() => {
    if (!socket) return;

    socket.on(
      SOCKET_EVENTS.STOP_SEARCH_CHAT,
      ({ message }: { message: string }) => {
        resetMessages();
        setChatId(null);
      }
    );
    socket.on(SOCKET_EVENTS.FOUND_CHAT, ({ chatId }: { chatId: string }) => {
      resetMessages();
      setChatId(chatId);
    });
    socket.on(SOCKET_EVENTS.EXIT_ON_CHAT, ({ chatId }: { chatId: string }) => {
      resetMessages();
      setChatId(null);
    });
    socket.on(SOCKET_EVENTS.SEARCH_CHAT, () => {});

    return () => {
      socket.off(SOCKET_EVENTS.STOP_SEARCH_CHAT);
      socket.off(SOCKET_EVENTS.FOUND_CHAT);
      socket.off(SOCKET_EVENTS.EXIT_ON_CHAT);
      socket.off(SOCKET_EVENTS.SEARCH_CHAT);
    };
  }, []);

  const contextValue: SocketContextData = useMemo(
    () => ({
      socket,
      senderId: socket?.id,
      searchChat,
      exitOnChat,
      stopSearchChat,
    }),
    [socket]
  );

  return (
    <socketContext.Provider value={contextValue}>
      {children}
    </socketContext.Provider>
  );
};
