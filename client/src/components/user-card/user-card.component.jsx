import React from 'react';

import profilePic from '../../assets/profile-default.svg';

import './user-card.styles.css';

const UserCard = ({ name }) => {
    return (
        <div className='user-card'>
            <img className='profile-picture' src={profilePic} alt='default profile pic' />
            <li className='curruser-names'>{name}</li>
        </div>
    )
};

export default UserCard;