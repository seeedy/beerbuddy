import * as io from 'socket.io-client';
import { getOnlineUsers, userJoined, userLeft } from './actions';

let socket;

export function getSocket(store) {
    console.log('store', store);
    if (!socket) {
        socket = io.connect();

        socket.on('onlineUsers', data => {
            // dispatch an action for the onlineUsers data
            store.dispatch(getOnlineUsers(data));

        });

        // socket.on('userJoined', data => {
        //     store.dispatch(userJoined(data));
        // });
        //
        // socket.on('userLeft', data => {
        //     store.dispatch(userLeft(data));
        // });
    }

    return socket;

}
