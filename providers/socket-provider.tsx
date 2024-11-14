import { Socket } from 'socket.io-client';
import { useSocket } from '@/socket/hooks/use-socket';
import { createContext, useCallback, useEffect, useMemo } from 'react';
import { SOCKET_EVENTS } from '@/socket/socket.events';
import { SearchChatRequest } from '@/socket/types';

type SocketContextData = {
  socket: Socket | undefined;
  senderId: string | undefined;
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

  const searchChat = useCallback(
    (data: SearchChatRequest) => {
      if (!socket) return;
      socket.emit(SOCKET_EVENTS.SEARCH_CHAT, data);
    },
    [socket]
  );

  const exitOnChat = useCallback(
    (data: { chatId: string }) => {
      if (!socket) return;
      socket.emit(SOCKET_EVENTS.STOP_SEARCH_CHAT, data);
    },
    [socket]
  );

  const stopSearchChat = useCallback(() => {
    if (!socket) return;
    socket.emit(SOCKET_EVENTS.STOP_SEARCH_CHAT);
  }, [socket]);

  useEffect(() => {
    if (!socket) return;

    socket.on(
      SOCKET_EVENTS.STOP_SEARCH_CHAT,
      ({ message }: { message: string }) => {}
    );
    socket.on(SOCKET_EVENTS.FOUND_CHAT, ({ chatId }: { chatId: string }) => {});
    socket.on(
      SOCKET_EVENTS.EXIT_ON_CHAT,
      ({ chatId }: { chatId: string }) => {}
    );
    socket.on(SOCKET_EVENTS.SEARCH_CHAT, () => {});

    return () => {
      socket.off(SOCKET_EVENTS.STOP_SEARCH_CHAT);
      socket.off(SOCKET_EVENTS.FOUND_CHAT);
      socket.off(SOCKET_EVENTS.EXIT_ON_CHAT);
      socket.off(SOCKET_EVENTS.SEARCH_CHAT);
    };
  }, []);

  const contextValue = useMemo(
    () => ({ socket, senderId: socket?.id } as SocketContextData),
    [socket]
  );

  return (
    <socketContext.Provider value={contextValue}>
      {children}
    </socketContext.Provider>
  );
};
