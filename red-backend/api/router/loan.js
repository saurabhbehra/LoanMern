const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const checkAuth = require('../middleware/check-auth');
const { isAdmin, isAgent, isCustomer} = require('../middleware/check-role')

//IMPORT MODELS
const Loan = require('../models/loan')
const User = require('../models/user')

//CREATING LOAN OBJECT
router.post("/:id", checkAuth, isAgent, (req,res,next) =>{
    let customerId = req.params.id
    let amount = req.body.amount
    let duration = req.body.duration

    let pm = amount/duration
    let interest = 0.02*amount
    let emi = pm+interest
    let totalPayable = emi*duration
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 30)

    let loanObject = new Loan({
        _id: mongoose.Types.ObjectId(),
        customer:customerId,
        amount:amount,
        duration:duration,
        emi:emi,
        firstRepaymentDate:currentDate,
        totalPayable:totalPayable
    })
    
    loanObject.save()
    .then(doc =>{
        res.status(200).json({
            message:'Loan Applied Succesfully',
            doc
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
})

//customer loan apllied view
router.get('/loan-applied',checkAuth, isCustomer, (req,res,next) =>{
    let customerId = req.userData.userId;
    Loan.find({customer:customerId})
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
        });
    })
})

//GET ALL LOAN OBJECT   
router.get('/all-loans',checkAuth, (req,res,next) =>{
    Loan.find()
    .populate('customer')
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
        });
    })
})


//LOAN APPROVAL OR REJECTION BY ADMIN
router.patch("/approval-or-reject/:customerId", checkAuth, isAdmin, (req,res,next) =>{
    let condition = {customer:req.params.customerId}
    let status =req.body.status
    let newvalues = { $set: {status:status}}

    Loan.findOneAndUpdate(condition, newvalues)
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
        
    
})


//EDIT A LOAN BY AGENT
router.patch("/edit-loan/:id", checkAuth, isAgent, (req,res,next) =>{
    let condition = {_id:req.params.id}
    let amount = req.body.amount
    let duration = req.body.duration

    let pm = amount/duration
    let interest = 0.02*amount
    let emi = pm+interest
    let totalPayable = emi*duration
    let currentDate = new Date()
    currentDate.setDate(currentDate.getDate() + 30)

    let newvalues = { $set: {amount:amount, duration:duration,emi:emi,firstRepaymentDate:currentDate,totalPayable:totalPayable}}

    Loan.find(condition)
    .exec()
    .then(doc =>{
        doc.map(result =>{
            if(result.status =='approved'){
                res.status(200).json({
                    msg:'Loan has been Already Approved',
                })
            }
            else{
                Loan.findOneAndUpdate(condition, newvalues)
                .exec()
                .then(doc =>{
                    res.status(200).json({
                        msg:'Loan Request updated successfully',
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
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })      
})

module.exports=router;