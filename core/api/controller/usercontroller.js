const chalk = require("chalk");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var uuid = require("uuid");
const cookieParser = require('cookie-parser');
var csrf = require('csurf');
const bodyParser = require("body-parser");


var csrfProtection = csrf({ cookie: true });
var parseForm = bodyParser.urlencoded({ extended: false });

exports.userlogin = async (req, res, next) => {
  
  console.log(chalk.yellow("User Login"));
      
      let jwtSecretKeyAccessToken = process.env.JWT_SECRET_KEY_ACCESSTOKEN;
      let jwtSecretKeyRefreshToken = process.env.JWT_SECRET_KEY_REFRESHTOKEN;

      var Email = req.body.Email;
      var Password = req.body.Password;
      var key = uuid.v4();

      const user =   await framework.db.User.findOne({ where: { email: Email } });


      let data = {
          time: Date(),
          userId: user.id,
      };

      let data2 = {
        time: Date(),
        key: key,
    };

    
  
    let accesstoken = jwt.sign(data,jwtSecretKeyAccessToken,{expiresIn: '1h'});
    let refreshtoken = jwt.sign(data2,jwtSecretKeyRefreshToken,{expiresIn: '1d'});

    await framework.db.User.update({ refreshtoken: refreshtoken , ekey : key}, {
      where: {
        id : user.id
      }
    });
    res.cookie('key',key,{httpOnly : true , maxAge : 24 * 60 * 60 * 1000 ,signed: true});
    res.cookie('jwt',refreshtoken,{httpOnly : true , maxAge : 24 * 60 * 60 * 1000 ,signed: true});
    res.json({status : "success Login" , accessToken: accesstoken , refreshkey : key});

};

exports.userregister = async (req, res, next) => {
  
  console.log(req.body);
    var hashPassword = await bcrypt.hash(req.body.Password,10);


  const  newUser = {

    firstName : req.body.firstName,
    lastName : req.body.lastName,
    email : req.body.email,
    contactNumber : req.body.contactNumber,
    password :  hashPassword,
    userType :  req.body.userType
  }


    await framework.db.User.create(newUser); 

    console.log(chalk.yellow("User Register"));
 
    res.json({status : "success Register"});
};


exports.refreshAccessToken = async (req, res, next)  =>{

  console.log('Refresh Controller');

  console.log(req.params);
  
  const refreshtokens = req.signedCookies;
  
  const accessToken = req.headers.authorization;

    if(Object.keys(refreshtokens).length == 0)
    {
        
        res.json({status : "error" , Message : "Token are not Valid"});

    }else if(!accessToken){
        res.json({status : "error" , Message : "Token are not Valid"});

    }else{
       


    }


  res.json({status:"Success" , Message : "Access Token Refreshed"});
};



exports.sendcsrf = (req,res)=>{
  
  res.json({status:"Success", csrfToken : req.csrfToken()});

};

