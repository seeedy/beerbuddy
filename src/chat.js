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
                        chat messages
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
