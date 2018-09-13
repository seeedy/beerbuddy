import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './welcome';
import App from './app';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import * as io from 'socket-io';


const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

let elem;

if (location.pathname == '/welcome') {
    elem = <Welcome />;
} else {
    elem =
    <Provider store={store}>
        <App />
    </Provider>;
}



// for logged in users
// const socket = io.connect();
//
// socket.on('hello', data => {
//     console.log(data.msg);
//     socket.emit('hell yea');
// });

ReactDOM.render(
    elem,
    document.querySelector('main')
);
