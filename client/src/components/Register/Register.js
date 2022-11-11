import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import axios from "axios";

export function Register(){

    const handleSubmit =(event) =>{

        event.preventDefault();

        var datastring = new FormData(event.target);

        var config = { headers: { "enctype": "multipart/form-data" } };

        axios.post("http://localhost:3001/register", datastring, config)

        
        .then(function (res) {
            if (res.data.status === 'not_inserted') {
                alert('Signup Not Success');
                window.location.reload();
            }
            else if (res.data.status === 'inserted') {
                alert('User Profile Created');
                
            }
        })
        .catch(function (err) {
            console.log(err);
        })
    }


    return(
        <>
        <Link to="/Register"></Link>

        <div className="container-fluid">
            <div className="row justify-content-center ">
                <div className="col-lg-6 col-md-8 mt-5">
                    <div className="tabel-responsive">
                        <form onSubmit={handleSubmit}>
                            <table className="table table-border table-info p-5 text-center">
                                <thead>
                                    <tr>
                                        <th colSpan={2}>New User Registration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="d-none">
                                        <select>
                                            <option value="end_user">end user</option>
                                        </select>
                                    </tr>
                                    <tr>
                                        <td>Username</td>
                                        <td>
                                        <input type="text" className="form-control" id="username" name="username" placeholder="Enter username" required autoComplete="off"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Password</td>
                                        <td>
                                        <input type="password" className="form-control" id="password" name="password" placeholder="Enter Password" autoComplete="off"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>
                                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter Email" autoComplete="off" required/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p>Already have an account? <span><Link to="/">Click here</Link> </span> </p>
                                        </td>
                                        <td>
                                            <button type="submit" name="submit_btn" id="submit_btn" className="btn btn-primary" >Register</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

