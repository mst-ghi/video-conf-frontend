import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import ioClient from 'socket.io-client';
import { Envs, getCookie } from '@/utils';

const IoClientConfig: SocketIOClient.ConnectOpts = {
  secure: true,
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 7,
  reconnectionDelay: 2000,
  transports: ['websocket'],
  query: {
    tkn: getCookie('sub-acc-tkn'),
  },
};

interface States {
  isConnected?: boolean;
  isDisconnected?: boolean;
  socket: SocketIOClient.Socket;
}

interface Actions {
  actions: {
    connect: () => void;
    disconnect: () => void;
    emit: <T extends {}>(arg: ISocketEmitArgs<T>) => void;
  };
}

const InitStoreData: States = {
  isConnected: false,
  isDisconnected: true,
  socket: ioClient(Envs.socket.url, IoClientConfig),
};

const socketStates = immer<States & Actions>((set) => {
  const { socket } = InitStoreData;

  socket.on('connect', () => {
    if (Envs.isDev) {
      console.log('socket connected, ID:', socket.id);
    }

    set({ isConnected: true, isDisconnected: false });
  });

  socket.on('disconnect', () => {
    if (Envs.isDev) {
      console.log('socket disconnected');
    }

    set(InitStoreData);
  });

  return {
    ...InitStoreData,
    actions: {
      connect: () => {
        if (getCookie('sub-acc-tkn')) {
          socket.connect();
        }
      },
      disconnect: () => {
        socket.disconnect();
      },
      emit: (arg) => {
        socket.emit(arg.event, arg.data);
      },
    },
  };
});

const useSocketIO = create(socketStates);

export default useSocketIO;