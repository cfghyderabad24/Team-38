import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const goToLogin = (option) => {
    switch (option) {
      case 'NGO Member':
        navigate("/ngo_login");
        break;
      case 'Volunteer':
        navigate("/volunteer_login");
        break;
      case 'Admin':
        navigate("/admin_login");
        break;
      case 'Student':
        navigate("/student_login");
        break;
      default:
        break;
    }
  };

  const cardContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    marginTop: '-100px',
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: '100px 20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    margin: '0 10px',
    cursor: 'pointer',
    transition: 'transform 0.3s',
    height: '250px',
    width: '250px',
  };

  const cardImgStyle = {
    width: '150px',
    height: '150px',
    marginBottom: '10px',
    borderRadius: '50%',
  };

  const cardTextStyle = {
    margin: '0',
    fontFamily: 'Times New Roman, Times, serif',
    fontSize: 'large',
  };

  const navbarStyle = {
    backgroundColor: 'black',
    padding: '10px 20px',
    textAlign: 'center',
    color: 'white',
    marginBottom: '20px',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    fontFamily:'times new roman',
  };

  const footerStyle = {
    backgroundColor: 'black',
    padding: '20px',
    textAlign: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    color:'white'
  };

  const pageStyle = {
    overflow: 'hidden',
  };

  return (
    <div style={pageStyle}>
      <div className="navbar" style={navbarStyle}>
        <h1>ST.BHATEVERA</h1>
      </div>
      <div className="container" style={cardContainerStyle}>
        <div className="row justify-content-center">
          <div className="col-md-3 col-sm-12">
            <div style={cardStyle} onClick={() => goToLogin('NGO Member')}>
              <img src="https://www.shutterstock.com/image-vector/ngo-organization-black-glyph-icon-260nw-1795132267.jpg" alt="User" style={cardImgStyle} />
              <div className="card-text" style={cardTextStyle}>
                <p>NGO member</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-12">
            <div style={cardStyle} onClick={() => goToLogin('Volunteer')}>
              <img src="https://hytheenvironmental.community/wp-content/uploads/2023/10/volunteer-1.jpg" alt="Volunteer" style={cardImgStyle} />
              <div className="card-text" style={cardTextStyle}>
                <p>Volunteer</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-12">
            <div style={cardStyle} onClick={() => goToLogin('Admin')}>
              <img src="https://i.pinimg.com/originals/6a/44/f0/6a44f0e35b10e6ed063eeebf7ed844f9.jpg" alt="Admin" style={cardImgStyle} />
              <div className="card-text" style={cardTextStyle}>
                <p>Admin</p>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-12">
            <div style={cardStyle} onClick={() => goToLogin('Student')}>
              <img src="https://cdn-icons-png.freepik.com/256/4140/4140037.png?semt=ais_hybrid" alt="Student" style={cardImgStyle} />
              <div className="card-text" style={cardTextStyle}>
                <p>Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer style={footerStyle}>
        <p>&copy; 2024 ST.BHATEVERA. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
