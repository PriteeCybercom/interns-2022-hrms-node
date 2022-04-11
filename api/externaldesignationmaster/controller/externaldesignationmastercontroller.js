// get reqest => giving data of all table
module.exports.get=(req,res,next)=>{
    framework.services.moduleServices.externaldesignationmasterservice
      .getdata()
      .then((data) => {
        res.status(200).send(data)
      })
      .catch((err) => {
        res.status(404).send(err)
      });
}


// post request => adding into database
module.exports.post=(req,res,next)=>{
  if(req.body.isActive == 0 || req.body.isActive== 1){
    framework.services.moduleServices.externaldesignationmasterservice.
    postdata(req.body)
    .then((data)=>{
      res.status(201).send(data)
    }).catch((err)=>{
      res.status(404).send(err)
    })
  }else{
    res.status(404).send("add valid isActive")
  }
}

// put request => updating database
module.exports.put=(req,res,next)=>{
  console.log(req.body)
  console.log(req.params.id)
  if(req.body.isActive == 0 || req.body.isActive== 1){
    framework.services.moduleServices.externaldesignationmasterservice.
    putdata(req.body,req.params.id)
    .then((data)=>{
      if(data==0){
        res.status(404).send("not found for updating")
      }
      res.status(201).send("updated succesfully")
    }).catch((err)=>{
      res.status(404).send(err)
    })
  }else{
    res.status(201).send("add valid isActive")
  }
}


// delete request => deleting database
module.exports.delete=(req,res,next)=>{
    framework.services.moduleServices.externaldesignationmasterservice.
    deletedata(req.params.id)
    .then((data)=>{
      if(data==0){
        res.status(404).send("not found for deleting")
      }
      res.status(200).send("deleted succesfully")
    }).catch((err)=>{
      res.status(404).send(err)
    })
}

// updatestatus request => updating request
module.exports.changeisactive=async (req,res,next)=>{
  if(req.params.status == 0 || req.params.status == 1){
    framework.services.moduleServices.externaldesignationmasterservice.
    updateisactivedata(req.params.status,req.params.id)
    .then((data)=>{
      if(data==0){
        res.status(404).send("not found for updating")
      }else{
        res.status(200).send("updated succesfully")
      }
    }).catch((err)=>{
      res.status(404).send(err)
    })
  }else{
    res.status(404).send("add valid isActive")
  }
}

