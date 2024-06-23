import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ngodashboard.css';

const ngodashboard = () => {
  const goToLogin = (option) => {
    if (option === 'user') {
      window.location.href = "/userlogin";
    } else if (option === 'admin') {
      window.location.href = "/adminlogin";
    }
  };

  return (
    <div>
      <div className="navbar">
        <h1>NGO DashBoard</h1>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-sm-12">
            <div className="card" onClick={() => goToLogin('login')}>
              <img
                src="https://cdn-icons-png.freepik.com/256/4140/4140037.png?semt=ais_hybrid"
                alt="User"
              />
              <div className="card-text">
                <p>Fresh Registration</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="card" onClick={() => goToLogin('admin')}>
              <img
                src="https://pnghq.com/wp-content/uploads/admin-profile-vector-png-photos-964.png"
                alt="Student details"
              />
              <div className="card-text">
                <p>Student</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <p>&copy; 2024 Navsanjeevan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ngodashboard;