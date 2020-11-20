const express =require('express');
const app=express();
const morgan=require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const session=require('express-session');
const cookieParser = require('cookie-parser');


const userRoutes = require("./api/router/user");
const customerRoutes = require("./api/router/customer");
const loanRoutes = require("./api/router/loan");
const filterRoutes = require("./api/router/filter");

//dot env
dotenv.config();

//image middleware
app.use('/uploads',express.static('uploads'));

// initialize the database connection
const mon = require('./config/database');
mongoose.set('debug', true);
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
  secret:'mysecret', 
  resave:true,
  saveUninitialized:true,
 }));
app.use(cookieParser('mysecret'));


//CORES header for handling error 
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
  
    res.setHeader('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE');
    next(); 
});

//Routes which should handle requests
app.use('/user',userRoutes);
app.use('/customer',customerRoutes);
app.use('/loan',loanRoutes);
app.use('/filter',filterRoutes);




 //error handling
app.use((req,res,next)=>{
    const error=new Error('Not found'); 
    error.status=404;
    next(error);
})

//error handling
app.use((error,req,res,next)=>{         
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    })
})

module.exports = app;