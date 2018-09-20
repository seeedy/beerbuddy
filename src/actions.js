import axios from './axios';

export async function getFriendsWannabes() {
    const { data } = await axios.get('/myfriends');
    console.log('axios data', data);
    return {
        type: 'RECEIVE_FRIENDS_WANNABES',
        users: data
    };
}

export async function acceptFriendRequest(wannabeId) {
    await axios.post('/friends/accept/' + wannabeId);
    return {
        type: 'ACCEPT_FRIEND_REQUEST',
        accept: wannabeId
    };
}

export async function unfriend(friendId) {
    await axios.post('/friends/cancel/' + friendId);
    return {
        type: 'UNFRIEND',
        delete: friendId
    };
}


/////////////////// online users stuff //////////////////////
export function getOnlineUsers(data) {
    return {
        type: 'RECEIVE_ONLINE_USERS',
        onlineUsers: data
    };
}

export function userLeft(data) {
    return {
        type: 'USER_LEFT',
        disconnectedUser: data
    };
}

export function userJoined(data) {
    return {
        type: 'NEW_USER_JOINED',
        newUser: data
    };
}


/////////////////////////// chat stuff ///////////////////////////
export function getChatMessages(data) {
    return {
        type: 'GET_CHAT_MESSAGES',
        msgs: data
    };
}

export function newChatMessage(data) {
    return {
        type: 'NEW_CHAT_MESSAGE',
        newMsg: data
    };
}

///////////////////////////// FoF /////////////////////////////////////
export async function getFriendsOfFriends(userId) {
    const { data } = await axios.get('/fof/' + userId);
    return {
        type: 'GET_FOF',
        fof: data.fof
    };
}

export function nullifyFof() {
    return {
        type: 'NULLIFY_FOF',
    };
}
