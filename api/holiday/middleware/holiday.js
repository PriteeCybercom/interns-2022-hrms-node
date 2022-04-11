
exports.validateDate=(req,res,next)=>{

    

    var fromDate = new Date(req.body.fromDate);
    var toDate = new Date(req.body.toDate);

    var diff = toDate.getTime() - fromDate.getTime(); 
    var daydiff = diff / (1000 * 60 * 60 * 24);   

    if(daydiff >= 0)
    {
        next();
    }else{
        res.status(400).json({status:"Error",message:"Invalid Date"});
    }

 
}

exports.inputCheck=(req,res,next)=>{
    if(req.body.title != "" && req.body.isActive != "" && req.body.fromDate != "" && req.body.toDate != "")
    {
        next()
    }else{
        res.status(400).json({status:"Error",message:"Invalid Input"});
    }
}