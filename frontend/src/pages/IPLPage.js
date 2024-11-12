import React from 'react';
import './IPLPage.css'; 
import { Link } from 'react-router-dom';
import chennaiLogo from '../images/chennai.png';
import rcbLogo from '../images/bengalore.jpg';
import miLogo from '../images/mi.png';
import dcLogo from '../images/delhi.jpg';
import kkrLogo from '../images/image.png';
import srhLogo from '../images/srh.png';
import rrLogo from '../images/rajatan.png';
import gtLogo from '../images/titans.png';
import PunjabLogo from '../images/punjab.png';
import LucknowLogo from '../images/lucknow.png';
import Banner from '../components/Banner.js';

const IPLPage = () => {
    return (
        <div className="container">
            <Banner />  {/* Display the banner at the top */}
            <h1 className="title">IPL Teams</h1>
            <div className="team-list">
                <Link to='/ipl/team/Chennai%20Super%20Kings' className="team-card">
                    <img src={chennaiLogo} alt="Chennai Super Kings logo" className="logo" />
                    <h2 className="team-name">Chennai Super Kings</h2>
                </Link>
                <Link to='/ipl/team/Mumbai%20Indians' className="team-card">
                    <img src={miLogo} alt="Mumbai Indians logo" className="logo" />
                    <h2 className="team-name">Mumbai Indians</h2>
                </Link>
                <Link to='/ipl/team/Royal%20Challengers%20Bengalore' className="team-card">
                    <img src={rcbLogo} alt="Royal Challengers Bangalore logo" className="logo" />
                    <h2 className="team-name">Royal Challengers Bangalore</h2>
                </Link>
                <Link to='/ipl/team/Delhi%20Capitals' className="team-card">
                    <img src={dcLogo} alt="Delhi Capitals logo" className="logo" />
                    <h2 className="team-name">Delhi Capitals</h2>
                </Link>
                <Link to='/ipl/team/Kolkata%20Knight%20Riders' className="team-card">
                    <img src={kkrLogo} alt="Kolkata Knight Riders logo" className="logo" />
                    <h2 className="team-name">Kolkata Knight Riders</h2>
                </Link>
                <Link to='/ipl/team/Sunrisers%20Hyderabad' className="team-card">
                    <img src={srhLogo} alt="Sunrisers Hyderabad logo" className="logo" />
                    <h2 className="team-name">Sunrisers Hyderabad</h2>
                </Link>
                <Link to='/ipl/team/Rajasthan%20Royals' className="team-card">
                    <img src={rrLogo} alt="Rajasthan Royals logo" className="logo" />
                    <h2 className="team-name">Rajasthan Royals</h2>
                </Link>
                <Link to='/ipl/team/Gujarat%20Titans' className="team-card">
                    <img src={gtLogo} alt="Gujarat Titans logo" className="logo" />
                    <h2 className="team-name">Gujarat Titans</h2>
                </Link>
                <Link to='/ipl/team/Kings%20XI%20Punjab' className="team-card">
                    <img src={PunjabLogo} alt="Kings 11 Punjab logo" className="logo" />
                    <h2 className="team-name">Kings XI Punjab</h2>
                </Link>
                <Link to='/ipl/team/Lucknow%20Super%20Giants' className="team-card">
                    <img src={LucknowLogo} alt="Lucknow Super Giants logo" className="logo" />
                    <h2 className="team-name">Lucknow Super Giants</h2>
                </Link>
            </div>
        </div>
    );
};

export default IPLPage;
