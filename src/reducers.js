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

    console.log('state', state);
    return state;
}
