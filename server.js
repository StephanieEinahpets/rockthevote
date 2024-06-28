const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt} = require("express-jwt")
const Issue = require('./models/Issue')
const path = require('path')


app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "dist")))

mongoose.set('strictQuery', false)
mongoose.connect('mongodb+srv://stephanieblackman:sudkALN9aSfXmTsp@cluster0.qdz6hud.mongodb.net/', (err) => {
    console.log('Connected to database', err)
})

app.use('/auth', require('./routes/authRouter'))
app.use('/api', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/issues', require('./routes/issueRouter'))
app.use('/api/comments', require('./routes/commentRouter'))
app.get('/public', async (req, res, next) => {
    try {
        const issues = await Issue.find()
        return res.status( 200 ).send( issues )
    } catch (error) {
        res.status( 500 )
        return next( error )
    }
    })

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html")); });
    
app.listen(6666, () => {
    console.log('Server is running on port 6666')
})