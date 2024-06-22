import React from 'react';
import styles from '../styles/Navbar.module.css';
const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>S.T. Bhatevara Foundation</div>
            <ul className={styles.navLinks}>
                <li><a href="#">Login</a></li>
                <li><a href="#">Signup</a></li>
            </ul>
        </nav>
    );
};
export default Navbar;