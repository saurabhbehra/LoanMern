const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const checkAuth = require('../middleware/check-auth');


//IMPORT MODEL
const User = require('../models/user')

router.get("/list", checkAuth, (req,res,next) =>{
    if(req.userData.role=='admin' || req.userData.role=='agent')
    {
        userList(req, res);
    }
    else{
        res.status(409).json({msg:'Access denied'})
    }
})

router.patch("/:id", checkAuth, (req,res,next) =>{
    if(req.userData.role=='admin' || req.userData.role=='agent')
    {
        userListUpdate(req, res);
    }
    else{
        res.status(409).json({msg:'Access denied'})
    }
})

const userList =(req,res) =>{
    User.find({role:'customer'})
    .exec()
    .then(doc =>{
        res.status(200).json({
            doc
        })
    })
    .catch(err=>{
         console.log(err);
         res.status(500).json({
             error:err
         })
     })
}

const userListUpdate=(req,res) =>{
    let condition = {_id:req.params.id}
    let name =req.body.name
    let email=req.body.email
    let password =req.body.password;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        else{
            let newvalues = { $set: { name:name, email:email,password:hash} };
            User.findOneAndUpdate(condition, newvalues)
            .exec()
            .then(doc =>{
                res.status(200).json({
                    msg:'updated successfully',
                    doc:doc
                })
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                })
            })
        }
    })
}
module.exports =router;