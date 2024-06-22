import React, { useState, useContext, useEffect } from "react";
import { store } from "../index";
import { Navigate } from 'react-router-dom';
import axios from "axios";
import NavbarHomepage from './NavbarHomepage'
import Footer from "./CustomFooter";

const Dashboard = () => {
    const { token } = useContext(store);
    const [data, setData] = useState(null);
    useEffect(() => {
        if (token) {
            axios.get('http://localhost:5000/myprofile', {
                headers: {
                    'x-token': token
                }
            })
                .then(res => { setData(res.data) })
                .catch(err => console.log(err));
        }
    }, [token]);
    if (!token) {
        return <Navigate to="/login" />;
    }
    return (
        <div>
            {
                data &&
                <div>
                    <NavbarHomepage email={data.email} rollNumber={data.rollNumber} id={data._id} />
                    <center>
                        <h1 style={{ color: "black", fontSize: "30px" }}>
                            My dashboard
                        </h1>
                    </center>
                    <Footer/>
                </div>
            }
        </div>
    )
}
export default Dashboard;