import { useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { CONFIG } from '../../common/config';

let socket: Socket | undefined;

const useSocket = (): [Socket | undefined, () => void] => {
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  }, []);

  if (!socket) {
    socket = io(`${CONFIG.API_URL}`, {
      transports: ['websocket'],
    });
  }
  return [socket, disconnect];
};

export default useSocket;
