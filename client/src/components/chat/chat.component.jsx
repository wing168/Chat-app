import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import io from 'socket.io-client';

import './chat.styles.css';

import { setMessages } from '../../redux/messages/messages.actions'

import { createStructuredSelector } from 'reselect';
import { setMessagesSelector } from '../../redux/messages/messages.selector';

import Infobar from '../infobar/infobar.component';
import Messages from '../messages/messages.component';
import Input from '../input/input.component';
import CurrentUsers from '../current-users/current-users.component';

let socket;

const Chat = ({ location, setMessages, messages }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [currentUsers, setCurrentUsers] = useState([])
    const endPoint = 'http://localhost:5000/';
    
    useEffect(() => {
        const { name, room } = queryString.parse(location.search)
        
        if (process.env.NODE_ENV === "production") {
            socket = io();
        } else {
            socket = io(endPoint);
        }

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
            setMessages(message); 
        });

        socket.on('roomData', roomData => {
            const usersObj = roomData.users;
            setCurrentUsers(usersObj);
        });
    }, [setMessages]);

    // function for sending messages

    const sendMessage = e => {

        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
            
        };
    };

return (
    <div className='outer-container'>
        <div className = 'inner-container'>
            <Infobar room={room} users={currentUsers} />
            <CurrentUsers currentUsers={currentUsers} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
    </div>
)
};

const mapDispatchToProps = dispatch => ({
    setMessages: message => dispatch(setMessages(message))
});

const mapStateToProps = createStructuredSelector({
    messages: setMessagesSelector
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);