import React from 'react';
import './components.css';  
import iplLogo from '../images/ipl.jpg'; 

const Banner = () => {
    return (
        <div className="banner">
            <img src={iplLogo} alt="IPL Banner" className="banner-img" />
        </div>
    );
};

export default Banner;
