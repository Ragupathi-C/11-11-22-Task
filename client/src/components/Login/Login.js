import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";

export function Login(){


    const handleSubmit = async (event) => {
        event.preventDefault();

        var datastring = new FormData(event.target);
        var config = { headers: { 'enctype': 'multipart/form-data' } }

        await axios.post('http://localhost:3001/login', datastring, config)
            .then(function (res) {
                if (res.data.status === "username_error") {
                    alert("User Name error")
                    window.location.reload();
                }
                else if (res.data.status === "invalid_login") {
                    alert("Invalid Login");
                    window.location.reload();
                }
                else if (res.data.status === "login_success") {
                    
                    if (res.data.role === "end_user") {
                        alert("Client Logined");
                    }
                    else {
                        alert("Please enter details again");
                        window.location.reload();
                    }
                }
            })
            .catch(function (err) {
                alert(err);
            })
    }

    return(
        <>
        <Link to="/"></Link>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6 mt-5 text-center bg-warning rounded p-5">
                    <div className="form-group">
                        <h1>Login</h1>
                        <form onSubmit={handleSubmit}>
                        <input type="text" className="form-control mt-3" id="username" name="username" placeholder="Enter username" required autoComplete="off"/>
                        <input type="password" className="form-control mt-3" id="password" name="password" placeholder="Enter Password" autoComplete="off"/>
                        </form>
                        
                    </div>
                    <button type="submit" className="btn btn-success col-lg-12" id="login_btn" name="login_btn">Login</button>
                    <p className="mt-3">New User? <span><Link to="/register">Register here</Link></span>  </p>
                </div>
            </div>
        </div>
        </>
    )
}