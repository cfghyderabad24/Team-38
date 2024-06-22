import axios from "axios";
import React, { useContext, useState,useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { store } from '../index'
import Navbar from "./Navbar";
import Footer from "./CustomFooter";

const Signup = () => {
    const navigate = useNavigate();
    const { token, setToken } = useContext(store);
    const [data, setData] = useState({
        Name: '',
        email: '',
        password: '',
        confirmPassword: '',
        contact: ''
    })
    console.log(token)
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token, setToken]); 
    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/register', data);
            alert(response.data);
            if (response.data === 'User registered successfully') {
                navigate('/login');
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else if (error.request) {
                console.error('No response received from the server');
            } else {
                console.error('Error during registration:', error.message);
            }
        }
    };
    if (token) {
        console.log(token)
        return <Navigate to='/dashboard' />;
    }
    return (
        <div>
            <Navbar />
            <center>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header text-center">
                                <h3>Signup Form</h3>
                            </div>
                            <div className="card-body">
                                <form onSubmit={submitHandler}>
                                    <table className="table table-borderless" cellSpacing={20} cellPadding={5}>
                                        <tbody>
                                            <tr>
                                                <td><label className="form-label">Roll Number:</label></td>
                                                <td><input type="text" name="rollNumber" className="form-control" placeholder="Enter your roll number" onChange={changeHandler} /></td>
                                            </tr>
                                            <tr>
                                                <td><label className="form-label">Email:</label></td>
                                                <td><input type="email" name="email" className="form-control" placeholder="Enter your email" onChange={changeHandler} /></td>
                                            </tr>
                                            <tr>
                                                <td><label className="form-label">Password:</label></td>
                                                <td><input type="password" name="password" className="form-control" placeholder="Enter your password" onChange={changeHandler} /></td>
                                            </tr>
                                            <tr>
                                                <td><label className="form-label">Confirm Password:</label></td>
                                                <td><input type="password" name="confirmPassword" className="form-control" placeholder="Confirm your password" onChange={changeHandler} /></td>
                                            </tr>
                                            <tr>
                                                <td><label className="form-label">Contact:</label></td>
                                                <td><input type="text" name="contact" className="form-control" placeholder="Enter your contact" onChange={changeHandler} /></td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2"><button type="submit" className="btn btn-primary w-100">Submit</button></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </center>
            <Footer />
        </div>
    );
}

export default Signup;
