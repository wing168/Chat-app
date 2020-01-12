import React from 'react';

import './input.styles.css';

const Input = ({ message, setMessage, sendMessage }) => (
    <form className='form'>
        <input 
        className='input'
        type='text'
        placeholder='Type your message here'
        value={message} 
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => e.key ==='Enter' ? sendMessage(e) : null}
        /> 
        <button className='send-btn' onClick={e => sendMessage(e)}>Send</button>

    </form>
);

export default Input;