import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState() // Optional if you want to set passwords here
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault()
        // We reuse the register route since it does the same thing: create a user
        axios.post("http://localhost:3001/register", {name, email, password})
        .then(result => {
            console.log(result)
            navigate('/home') // Go back to dashboard
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <form onSubmit={Submit}>
                    <h2>Add User</h2>
                    <div className="mb-2">
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder="Enter Name" className="form-control" 
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="">Email</label>
                        <input type="email" placeholder="Enter Email" className="form-control" 
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    {/* Simplified: We are reusing the register endpoint, so we need a password */}
                    <div className="mb-2">
                        <label htmlFor="">Password</label>
                        <input type="text" placeholder="Enter Password" className="form-control" 
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className="btn btn-success">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser;