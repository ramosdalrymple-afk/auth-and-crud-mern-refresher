import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './Home'
import CreateUser from './CreateUser' // Import this
import UpdateUser from './UpdateUser' // Import this
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/create' element={<CreateUser />}></Route>
        <Route path='/update/:id' element={<UpdateUser />}></Route> 
      </Routes>
    </BrowserRouter>
  )
}

export default App