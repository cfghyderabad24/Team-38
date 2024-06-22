  import React, { useState, useEffect } from 'react';
  import { useParams } from 'react-router-dom';
  import axios from 'axios';
  import "./Details.css"

  const Details = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
      axios.get(`http://localhost:4000/users/${id}`)
        .then(response => {
          if (response.status === 200) {
            setUser(response.data);
          }
        })
        .catch(err => setError(err.message));
    }, [id]);

    const handleApprove = async () => {
      try {
        // Make a POST request to the provided API endpoint
        const response = await axios.post('http://100.72.52.124:8000/api/create-student/', {
          name: user.name, // Replace with appropriate user details
          email: 'ashreen954@example.com' // Replace with appropriate user email
          // Add other relevant data as needed
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        // Handle successful response from the API
        console.log('Email sent successfully:', response.data);
        // Optionally, update the UI or show a success message
      } catch (error) {
        // Handle error from API request
        console.error('Error sending email:', error);
        // Optionally, show an error message to the user
      }
    };

    return (
      <div>
        {error ? (
          <h1>Something went wrong: {error}</h1>
        ) : (
          user ? (
            <div className='text-center'>
              <h1>Student Details</h1>
              <div className='border border-3 border-black w-50 m-auto mt-5 p-4'>
                <p>ID: {user.id}</p>
                <p>Name: {user.name}</p>
                <p>College: {user.clg}</p>
                {/* Add other user details here */}
                <button className='btn btn-success btn-spacing' onClick={handleApprove}>
                  Approved
                </button>
                <button className='btn btn-danger btn-spacing'>
                  Rejected
                </button>
              </div>            
            </div>
          ) : (
            <h1>Loading...</h1>
          )
        )}
      </div>
    );
  }

  export default Details;
