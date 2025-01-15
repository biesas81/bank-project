import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
   
    return ( 
        
        <header className="container text-bg-dark d-flex justify-content-center py-3 mb-5">
            <ul className="nav nav-pills">
                <li className="nav-item">
                    <Link to="/" className="nav-link text-white">Home</Link>
                </li>
                <li className="nav-item">
                    <Link to="/new-account" className="nav-link text-white">New Account</Link>
                </li>
            </ul>
        </header>
    );
}

export default Header;