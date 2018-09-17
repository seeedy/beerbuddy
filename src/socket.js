import * as io from 'socket.io-client';
import { getOnlineUsers, userJoined, userLeft, getChatMessages, newChatMessage } from './actions';

let socket;

export function getSocket(store) {
    console.log('store', store);
    if (!socket) {
        socket = io.connect();

        socket.on('onlineUsers', data => {
            store.dispatch(getOnlineUsers(data));
        });

        socket.on('userJoined', data => {
            store.dispatch(userJoined(data));
        });

        socket.on('userLeft', data => {
            store.dispatch(userLeft(data));
        });

        socket.on('chatMessages', data => {
            store.dispatch(getChatMessages(data));
        });

        socket.on('newChatMessage', data => {
            console.log('socket.on newChatMessage', data);
            store.dispatch(newChatMessage(data));
        });

    }

    return socket;

}
