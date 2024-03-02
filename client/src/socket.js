import { io } from 'socket.io-client';
import { ENDPOINT } from './Constants';

export const initSocket = async () => {
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 10000,
        transports: ['websocket'],
    };
    return io(ENDPOINT, options);
};