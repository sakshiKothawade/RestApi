const express = require('express');
const mongoose = require('mongoose');
const app= express();
const bodyParser=require('body-parser');
const cors=require('cors')
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.send("We are now on home");
});

const postsRoute=require('./routes/posts');

app.use('/posts',postsRoute);

mongoose.connect(
    process.env.DB_CONNECTION ,
    ()=>console.log("connected to db")
);

app.listen(3000);