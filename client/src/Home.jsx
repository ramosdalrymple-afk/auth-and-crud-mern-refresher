import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {
    const [users, setUsers] = useState([])

    // Fetch data when component mounts
    useEffect(() => {
        axios.get('http://localhost:3001/getUsers')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/deleteUser/'+id)
        .then(res => {
            console.log(res)
            window.location.reload() // Refresh page to see changes
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
                <Link to="/create" className='btn btn-success btn-sm'>Add +</Link>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {
                                return <tr key={user._id}> {/* MongoDB uses _id, not id */}
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Link to={`/update/${user._id}`} className='btn btn-success btn-sm me-2'>Edit</Link>
                                        <button className='btn btn-danger btn-sm' onClick={(e) => handleDelete(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home