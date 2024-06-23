import React from 'react';
// import CustomFooter from './components/CustomFooter/CustomFooter';

const Home = () => {

  const pageStyle = {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    backgroundImage: 'url(https://www.nasa.gov/wp-content/uploads/2022/01/scholarship-website-banner.png?w=1366)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: 'Times New Roman',
    color: 'black',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    color: 'black',
    textAlign: 'left',
    padding: '10px',
    fontSize: '3.9em',
    fontWeight: 'bold',
    lineHeight: '1.5',
    marginLeft: '20px', // Align content to the left
  };

  const sectionStyle = {
    padding: '50px 20px',
    textAlign: 'left',
    backgroundColor: '#f8f9fa',
  };

  const aboutUsStyle = {
    ...sectionStyle,
    backgroundColor: '#f0f0f0',
  };

  const contactUsStyle = {
    ...sectionStyle,
    backgroundColor: '#e0e0e0',
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
    color: 'white',
  };

  return (
    <div>
      <div style={pageStyle}>
        <div style={overlayStyle}></div>
        <div style={{ ...contentStyle, minHeight: '100vh' }}>
          <div>
            S.T. BHATEVERA 
          </div>
        </div>
      </div>
      <footer style={footerStyle}>
        <p>&copy; 2024 ST.BHATEVERA. All rights reserved.</p>
      </footer>
      {/* <CustomFooter /> */}
    </div>
  );
};

export default Home;