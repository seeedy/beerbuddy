import React from 'react';
import { connect } from 'react-redux';
import { getSocket } from './socket';

class Chat extends React.Component {

    sendChatMessage(e) {
        if (e.which === 13) {
            getSocket().emit('sendMessage', e.target.value);
        }
    }

    render() {

        const { msgs } = this.props;
        console.log('mounting chat');

        if (!msgs) {
            return null;
        }

        return (
            <div id="chat-wrapper">
                <h2>Public chat</h2>

                <div className="chat-box" ref={elem => (this.elem = elem)}>
                    <div className="chat-display">

                        {msgs.map(msg => (
                            <div className="chat-content" key={msg.msg_id}>

                                <div className="chat-avatar-box">
                                    <img className="chat-message-avatar" src={msg.msg_sender_img} />
                                </div>

                                <div className="chat-message">
                                    <div className="chat-sender">
                                        <div className="sender-name">{msg.msg_sender_first} {msg.msg_sender_last}</div>
                                        <div className="time-sent">{msg.localTime}</div>
                                    </div>
                                    <div className="chat-message-text">
                                        {msg.msg_text}
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <textarea
                            className="chat-textarea"
                            onKeyDown={ this.sendChatMessage }
                            defaultValue="chat...">
                        </textarea>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        msgs: state.msgs
    };
};

export default connect(mapStateToProps)(Chat);
