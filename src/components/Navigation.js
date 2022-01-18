import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/navigation.css';
import logo from '../images/space_pod_logo.png';

const Navigation = () => {
    const [responsive, setResponsive] = useState(false);
    const handleClick = () => setResponsive(!responsive);
    const closeMobileMenu = () => setResponsive(false);

    return(
    <header>
        <nav>
            <div className="logo">
                <Link to="/" onClick={closeMobileMenu}><img src={logo} className="logo-image" alt="Space Pod Logo"></img></Link>
            </div>
            <div className={responsive ? 'nav-sections responsive' : 'nav-sections'}>
                <ul className="nav-links">
                    <li><Link className="nav-link" to="/" onClick={closeMobileMenu}>Home</Link></li>
                    <li><Link className="nav-link" to="/LikedPhoto" onClick={closeMobileMenu}>My Liked Photos</Link></li>
                </ul>
            </div>
            <div className={responsive ? 'hamburger responsive' : 'hamburger'} onClick={handleClick}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    </header>
    );
}

export default Navigation;