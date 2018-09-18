export default function (state = {}, action) {

    if (action.type == 'RECEIVE_FRIENDS_WANNABES') {
        console.log('running reducers', action);
        state = { ...state, users: action.users};
    }

    if (action.type == 'ACCEPT_FRIEND_REQUEST') {
        console.log('running reducers', action);
        state = {
            ...state,
            users: state.users && state.users.map(user => {
                if (user.id == action.accept) {
                    user.status = 2;
                }
                return user;
            })
        };
    }

    if (action.type == 'UNFRIEND') {
        console.log('running reducers', action);

        state = {
            ...state,
            users: state.users && state.users.filter(user => user.id != action.delete)
        };
    }

    // ********************** online users *****************************
    if (action.type == 'RECEIVE_ONLINE_USERS') {
        console.log('running reducers', action);

        state = {
            ...state,
            onlineUsers: action.onlineUsers
        };
    }


    if (action.type == 'NEW_USER_JOINED') {
        console.log('running reducers', action);

        let uniqueNewUser = true;
        state.onlineUsers.forEach(user => {
            if (user.id == action.newUser.id) {
                uniqueNewUser = false;
            }
        });

        if (!uniqueNewUser) {
            return state;
        }

        const onlineUsersUpdated = [ ...state.onlineUsers, action.newUser];

        state = {
            ...state,
            onlineUsers: onlineUsersUpdated
        };
    }

    if (action.type == 'USER_LEFT') {
        console.log('running reducers', action);

        const onlineUsersUpdated = state.onlineUsers.filter(user => {
            return user.id != action.disconnectedUser;
        });

        state = {
            ...state,
            onlineUsers: onlineUsersUpdated
        };
    }

    // ********************** chat **************************

    if (action.type == 'GET_CHAT_MESSAGES') {
        console.log('running reducers', action);

        state = {
            ...state,
            msgs: action.msgs
        };
    }

    if (action.type == 'NEW_CHAT_MESSAGE') {
        console.log('running reducers', action);

        const updatedMsgs = [ ...state.msgs, action.newMsg ];

        state = {
            ...state,
            msgs: updatedMsgs
        };
    }


    return state;
}
