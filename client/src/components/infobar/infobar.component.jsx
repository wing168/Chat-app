import React from 'react';

import './infobar.styles.css';

import closeIcon from '../../assets/closeIcon.png';
import onlineIcon from '../../assets/onlineIcon.png';

const Infobar = ({ room }) => (
    <div className='info-bar'>
        <div className='left-inner-container'>
            <img className='online-icon' src={onlineIcon} alt='online' />
            <h3>{room}</h3>
        </div>
        <div className='right-inner-container'>
            <a href='/'><img src={closeIcon} alt='close' /></a>
        </div>

    </div>
);

export default Infobar;