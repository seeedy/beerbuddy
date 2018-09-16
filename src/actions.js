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


/////////////////// socket stuff //////////////////////
export function getOnlineUsers(dataDB) {
    return {
        type: 'RECEIVE_ONLINE_USERS',
        onlineUsers: dataDB
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
