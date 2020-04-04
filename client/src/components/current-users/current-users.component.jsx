import React from 'react';

import './current-users.styles.css';

import UserCard from '../user-card/user-card.component';

const CurrentUsers = ({currentUsers}) => {
    return (
        <div className='user-container'>
            
            {currentUsers.map((user, index) => <UserCard key={index} name={user.name} />)}
        </div>
    )
};

export default CurrentUsers;