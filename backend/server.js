const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const {notFound, errorHandler} = require('./middleware/errorMiddleware');

const app = express()
app.use(express.json()) //to accept json data

dotenv.config()
const data = require('./data/data');
const colors = require('colors');
connectDB()

app.get("/", (req,res)=>{
    res.send("api is running")
})
app.get("/chats", (req,res)=>{
    res.send(data)
})

app.use('/api/user', userRoutes)
app.use('/api/chat', chatRoutes)

app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000

app.listen(5000, ()=>{
    console.log(`Server is listen at ${port}`.yellow.bold);
})