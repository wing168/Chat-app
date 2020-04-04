import React from 'react';

import ReactEmoji from 'react-emoji';

import './message.styles.css';

const Message = ({ message: { user, text, timestamp }, name }) => {
    
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();

    if(user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser ?
        (
            <div className='msg-container justify-right'>
                <div className= 'info-text'>
                    <p className='sent-text pr-10'>{trimmedName}</p>
                    <p className='timestamp pr-10'>{timestamp}</p>
                </div>
                
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
            <div className= 'info-text'>
                <p className='sent-text pl-10'>{user}</p>
                <p className='timestamp pl-10'>{timestamp}</p>
            </div>
            
        </div>
        )
    );

};

export default Message;