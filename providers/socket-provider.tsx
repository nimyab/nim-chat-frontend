import { Socket } from 'socket.io-client';
import { useSocket } from '@/socket/hooks/use-socket';
import { createContext, useMemo } from 'react';

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
