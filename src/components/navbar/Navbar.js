import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import { loginContext } from '../contexts/loginContext';

function Navbar() {

  let [currentUser,error,userLoginStatus,loginUser,logoutUser]=useContext(loginContext)

  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark '>
        {/* <Link className='navbar-brand px-3' to='/'> <img src="https://www.computerhope.com/issues/pictures/users.png" alt="nav-brand" width={50}/> </Link> */}
        <li className='nav-item'>  
            <Link className='nav-link' to='/'><h5>S.T. Bhatevara Foundation</h5></Link>
        </li>
        <ul className='navbar-nav ms-auto px-5'>
        <li className='nav-item'>  
            <Link className='nav-link' to='/'>Home</Link>
            </li>
          <li className='nav-item'>  
            <Link className='nav-link' to='/register'>Register</Link>
            </li>
           {!userLoginStatus ? (
            <li className='nav-item'>  
            <Link className='nav-link' to='/login'>Login</Link>
            </li>):(
            <li className='nav-item'>  
            <Link className='nav-link' onClick={logoutUser} to='/login'>Logout</Link>
            </li>)
           }
            <li className='nav-item'>  
            <Link className='nav-link' to='/aboutus'>AboutUs</Link>
            </li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar

