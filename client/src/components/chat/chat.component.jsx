import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import './chat.styles.css';

import Infobar from '../infobar/infobar.component';
import Messages from '../messages/messages.component';
import Input from '../input/input.component';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const endPoint = 'https://whm-chat.herokuapp.com/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        
        socket = io(endPoint);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, () => {

        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [endPoint, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message]) //can't change state so keeping existing state and adding in new "message"
        });
    }, [messages]);

    // function for sending messages

    const sendMessage = e => {

        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        };
    };

    console.log(message, messages);

return (
    <div className='outer-container'>
        <div className = 'inner-container'>
            <Infobar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

        </div>
    </div>
)
};

export default Chat;