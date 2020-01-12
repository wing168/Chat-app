import React from 'react';

import ReactEmoji from 'react-emoji';

import './message.styles.css';

const Message = ({ message: { user, text }, name }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser ?
        (
            <div className='msg-container justify-right'>
                <p className='sent-text pr-10'>{trimmedName}</p>
                <div className='msg-box bg-currentuser'>
                    <p className='msg-text txtcolor-currentuser'>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        :
        (
        <div className='msg-container justify-left'>
             <div className='msg-box bg-otheruser'>
                <p className='msg-text txtcolor-otheruser'>{ReactEmoji.emojify(text)}</p>
            </div>
            <p className='sent-text pl-10'>{user}</p>
        </div>
        )
    );

};

export default Message;