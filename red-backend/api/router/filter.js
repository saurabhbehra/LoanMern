const express = require("express");
const router = express.Router();

//IMPORT MODELS
const Loan = require('../models/loan')

router.post('/loans',(req,res,next)=>{
    const searchBy = req.body.status;
    const a = '.*' + searchBy + '.*';

    Loan.find({status: new RegExp(a, 'i')}).exec()
        .then(doc =>{
            res.status(200).json({
                listCount: doc.length,
                doc
            })
            console.log(doc)
        })
        .catch(error => {
            res.status(401).json({
                error
            })
            console.log(error)
        })
})

module.exports = router;