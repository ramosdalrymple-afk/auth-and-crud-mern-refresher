const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const EmployeeModel = require('./models/Employee')

const app = express()
app.use(express.json())
app.use(cors())

// 1. CONNECTION TO MONGODB (Phase 1)
mongoose.connect("mongodb://127.0.0.1:27017/employee");

// 2. ROUTE FOR LOGIN
app.post("/login", (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user => {
        if(user) {
            if(user.password === password) {
                res.json("Success")
            } else {
                res.json("the password is incorrect")
            }
        } else {
            res.json("no record existed")
        }
    })
})

// 3. ROUTE FOR REGISTRATION
app.post('/register', (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))

})

app.listen(3001, () => {
    console.log("server is running")
})

// 1. READ (Get all users)
app.get('/getUsers', (req, res) => {
    EmployeeModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

// 2. READ SINGLE USER (For the Edit form)
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    EmployeeModel.findById({_id: id})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

// 3. UPDATE (Edit a user)
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    EmployeeModel.findByIdAndUpdate({_id: id}, {
        name: req.body.name, 
        email: req.body.email, 
        age: req.body.age // Optional: you can add more fields here if you update your schema
    })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})

// 4. DELETE (Remove a user)
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    EmployeeModel.findByIdAndDelete({_id: id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})