import { logger } from '@/utils/logger';
import { useEffect, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';

type UseSocketProps = {
  url: string;
};

export const useSocket = ({ url }: UseSocketProps) => {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socket = io(url, {
      reconnectionAttempts: Infinity,
    });

    // TODO: сделать обработку ошибок
    socket.on('error', (error) => {});

    socket.on('connect_error', (error) => {});

    setSocket(socket);

    return () => {
      if (socket.connected) socket.disconnect();
    };
  }, [url]);

  return { socket };
};
