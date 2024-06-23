import React from 'react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomFooter() {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container">
        <div className="row justify-content-center text-center">
          <div className="col-md-6">
            <h5>About Us</h5>
            <p>Bhatevara Foundation is dedicated to transforming lives through education and skill development. We offer scholarships, vocational training, and essential programs in career guidance, soft skills, interview preparation, mentoring, and English speaking. Our efforts also focus on developing educational infrastructure to support students and educators. Join us in empowering individuals and uplifting communities for a brighter future</p>
          </div>
          <div className="col-md-6">
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li>+91 9876543210</li>
              <li> bhatavera@gmail.com</li>
              <li> Mind Space, Hyderabad</li>
              <li> Telangana</li>
            </ul>
          </div>
         
          
        </div>
        <div className="d-flex justify-content-between align-items-center pt-4 mt-4 border-top">
          <p className="mb-0">&copy; 2024 Bhatevara Foundation. All rights reserved.</p>
          <div>
            <a href="#" className="text-light mx-2"><BsFacebook /></a>
            <a href="#" className="text-light mx-2"><BsInstagram /></a>
            <a href="#" className="text-light mx-2"><BsTwitter /></a>
            <a href="#" className="text-light mx-2"><BsGithub /></a>
            <a href="#" className="text-light mx-2"><BsDribbble /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default CustomFooter;