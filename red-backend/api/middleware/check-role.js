exports.isAdmin =(req,res,next)=>{
    if(req.userData.role!='admin')
    {
        res.status(409).json({
            msg:'Access denied'
        })
    }
    else{
       next()
    }
}

exports.isAgent =(req,res,next)=>{
    if(req.userData.role!='agent')
    {
        res.status(409).json({
            msg:'Access denied'
        })
       
    }
    else{
        next()
    }
}

exports.isCustomer =(req,res,next)=>{
    if(req.userData.role!='customer')
    {
        res.status(409).json({
            msg:'Access denied'
        })
    }
    else{
      next()
    }
}


