const express = require("express");
const { connectMongoDb } = require("./connection");
const fs = require("fs");
const { stringify } = require("querystring");
const userRouter = require('./routes/user')
const { logReqRes } = require("./middlewares/index")
const app = express();
const PORT = 8000;

//connection
connectMongoDb('mongodb://127.0.0.1:27017/youtube-app-1').then(()=>
    console.log('Mongodb conneeected')
);
//Schema

// Middleware - Plugin
app.use(express.urlencoded({extended: false}));
app.use(logReqRes('log.txt'));

// /Routes
app.use("/api/user", userRouter);

app.listen(PORT, ()=>{console.log(`server started at PORT: ${PORT}`)});
