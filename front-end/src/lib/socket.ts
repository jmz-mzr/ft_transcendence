import { BACKEND_URL } from '@/constants/env';
import { getCookie } from 'cookies-next';
import { io } from 'socket.io-client';

const cookie = getCookie('jwt', {
  sameSite: 'strict',
});

const socket = io(BACKEND_URL, {
  query: {
    token: cookie,
  },
  autoConnect: false,
});
socket.on('connect', () => {
  socket.sendBuffer = [];
});

if (cookie) socket.connect();

export default socket;
