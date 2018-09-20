import React from 'react';
import { connect } from 'react-redux';
import { getSocket } from './socket';


class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        /// !!!!!!!! ALWAYS BIND THE METHODS TO THIS !!!!!!!
        this.sendChatMessageBtn = this.sendChatMessageBtn.bind(this);
    }

    componentDidUpdate() {
        if (!this.elem) {
            return;
        }
        this.elem.scrollTop = this.elem.scrollHeight - this.elem.clientHeight;
    }

    sendChatMessage(e) {
        if (e.which === 13) {
            getSocket().emit('sendMessage', e.target.value);
            e.target.value = '';
        }
    }

    sendChatMessageBtn() {
        console.log('send message btn', this.txt.value);
        getSocket().emit('sendMessage', this.txt.value);
        this.txt.value = '';
    }

    render() {

        const { msgs } = this.props;
        if (!msgs) {
            return null;
        }

        return (
            <div id="chat-wrapper">

                <div className="chat-box">
                    <div className="chat-display"
                        ref={elem => (this.elem = elem)}>

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
                            placeholder="enter message"
                            ref={ elem => (this.txt = elem) }>
                        </textarea>
                        <div
                            className="send-msg-btn"
                            onClick={ this.sendChatMessageBtn }>
                            <i className="fas fa-paper-plane"></i>
                        </div>
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
