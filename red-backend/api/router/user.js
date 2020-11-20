const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const {check, validationResult} = require('express-validator/check');

//IMPORT MODELS
const User= require('../models/user');


//SIGNUP ROUTE
router.post("/signup", [
    check('password').isLength({min: 4}).not().isEmpty().trim().escape(),
    check('name').isLength({min: 3}).not().isEmpty().trim().escape(),
    check('email').not().isEmpty().isEmail().trim().escape(),
   
], (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
   
    let name = req.body.name;
    let email=req.body.email
    let password = req.body.password;
    let role=req.body.role;
    User.find({email: email}).exec().then(doc => {
        if (doc.length > 0) {
            return res.status(409).json({
                error: {
                    status: "Failed",
                    message: "Already registered please login or reset your password"
                }
            });
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        name: name,
                        email:email,
                        role:role,
                        password: hash,
                    });
                    user.save().then(doc => {
                        let _id = doc._id;
                        const token = jwt.sign(
                            {
                                email:doc.email,
                                id: _id
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: process.env.jwtExpiresIn
                            }
                        );
                        
                        if(doc.role=='customer'){
                            return res.status(200).json({
                                status: "Success",
                                message: "Customer Successfully registered",
                                customerId:_id
                            })
                        }
                        else if(doc.role=='agent'){
                            return res.status(200).json({
                                status: "Success",
                                message: "Agent Successfully registered",
                                agentId:_id
                            })
                        }
                        else {
                            return res.status(200).json({
                                status: "Success",
                                message: "Admin Successfully registered",
                                adminId:_id
                            })
                        }
                       
                    }).catch(function (err) {
                        res.status(500).json({
                            error: err
                        });
                        console.log(err)
                    })
                }
            })
        }

    }).catch(err => {
        res.status(500).json({
            error: err
        });
        console.log(err)
    });
});


//LOGIN ROUTE
router.post("/login",(req,res,next)=>{
    User.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:"Auth Failed"
            });
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:'Auth failed'
                });
            }
            if(result){
               const token= jwt.sign(
                   {
                    email:user[0].email,
                    name:user[0].name,
                    userId:user[0]._id,
                    role:user[0].role
                },
                process.env.JWT_KEY
                );
                return res.status(200).json({
                    message:'Auth successful',
                    email:user[0].email,
                    name:user[0].name,
                    userId:user[0]._id,
                    role:user[0].role,
                    token:token
                });
            }
            res.status(401).json({
                message:'Auth failed'
        });
    });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
})


module.exports=router;