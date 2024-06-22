import React, { useContext } from "react";
import { Link } from 'react-router-dom';
import { store } from "../index";
import { Navigate } from 'react-router-dom';

function NavbarHomepage(props) {
    const mail = props.email;
    const username = mail.split('@')[0];
    const { token, setToken } = useContext(store);
    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    if (!token) {
        return <Navigate to="/login" />
    }
    return (
        <nav className="navbar">
            <div className="left-container">
                <img src="logo.png" alt="Logo" className="logo" />
            </div>
            <div className="right-container">
                <div>
                    Hello {username}
                </div>
                <Link to="/" className="nav-link">Profile</Link>
                <button onClick={handleLogout} style={{ color: "black", backgroundColor: "rgba(255, 255, 255, 0.0)"}}> Logout </button>
            </div>
        </nav>
    );
}

export default NavbarHomepage;
