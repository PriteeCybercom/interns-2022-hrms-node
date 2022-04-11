import {exec} from 'child_process';
import  fsObj  from "fs";
import chalk from "chalk";
import path from "path";
import fse from "fs-extra";
import arg from 'arg';
import pkg from 'inquirer';

const __dirname = path.resolve();
const configFolderName = "config";
const customCommandFolderName = "bin";
const ApplicationConfigFileName = "appConfig.json";
const ApplicationPackageFileName = "package.json";
let binObject = {}

var configObject = {
    appConfig : {
        port : null,
        apiFolderName : null,
        nodeEnviroment : null,
    },
    dbConfig: {
        username : null,
        password : null,
        database : null,
        host : null,
        dialect : null,
    },
    dbMigrationCofig :{
        dbModelConfigFile: "db/models/index.js",
        globalModelFolderName: "db",
        modelFolderName: "models",
        migrationFolderName: "migrations"
    },
    secretKeyConfig: {
        jwtAccessTokenSecretKey : null,
        jwtRefreshTokenSecretKey : null,
        cookieSecretKey : null
    }
};

const filePath = path.join(__dirname,configFolderName,ApplicationConfigFileName);
const FolderPath = path.join(__dirname,configFolderName);
const packagePath = path.join(__dirname,ApplicationPackageFileName);
const commandFolderPath = path.join(__dirname,customCommandFolderName);


var checkFortheDataAvailability = new Promise((resolve, reject) => {
    var arrQues = [];
    let askForappConfigAllTheDetails = false;
    let askFordbConfigAllTheDetails = false;
    let askForsecretKeyConfigAllTheDetails = false;
    let askForAllTheDetails = false;

    if(!fsObj.existsSync(FolderPath)){

        fsObj.mkdir(FolderPath,(error) => {
            if (error) {
                console.log(error);
            }
        });

    }
    if (!fsObj.existsSync(filePath)) {
        // if files does not exists
        fsObj.writeFileSync(filePath, "");
    }
    try {
        // check if file having read/write permission or not.
        fsObj.accessSync(filePath, fsObj.constants.R_OK | fsObj.constants.W_OK);
        // read file and fetch the data from the file
        fsObj.readFile(filePath, 'utf8', (err, data) => {

            //check if any data available in the file or not.
            if (data) {
                var currentConfigObject = JSON.parse(data);
                if (currentConfigObject) {
                    // if data available in current config file.
                    // then check for each fields that all the needed fields are available or not.


                    Object.keys(configObject).forEach(function (mainkey) {                     
                        if(currentConfigObject?.[mainkey])
                        {   
                             Object.keys(configObject[mainkey]).forEach(function (key) {
                                if (currentConfigObject?.[mainkey][key]) {
                                    configObject[mainkey][key] = currentConfigObject[mainkey][key];
    
                                }
                                else {
                                    let obj = {
                                        type: "input",
                                        name: key,
                                        message: key
                                    }
                                    arrQues.push(obj);
                                    console.log(arrQues);
                                }
                            }); 
                            
                        }else{
                            eval ("askFor"+[mainkey]+"AllTheDetails = true");
                        }

                    
                    
                    });
                }

            }
            else {
                askForAllTheDetails = true;
            }

            if (askForappConfigAllTheDetails) {
                arrQues = [
                    {
                        type: 'input',
                        name: 'port',
                        message: "Please provide the application config details.\nPort:"
                    },
                    {
                        type: 'input',
                        name: 'apiFolderName',
                        message: "Api Folder Name:"
                    },
                    {
                        type: 'input',
                        name: 'nodeEnviroment',
                        message: "Node Enviroment (development/production):"
                    },
                   
                ]
            }
            if(askFordbConfigAllTheDetails)
            {
                arrQues = [
                    {
                        type: 'input',
                        name: 'username',
                        message: "Please provide the DataBase config details.\n UserName : "
                    },
                    {
                        type: 'input',
                        name: 'password',
                        message: "Password : "
                    },
                    {
                        type: 'input',
                        name: 'database',
                        message: "DataBase : "
                    },
                    {
                        type: 'input',
                        name: 'host',
                        message: "host:"
                    },
                    {
                        type: 'input',
                        name: 'dialect',
                        message: "dialect:"
                    },
                   
                ]
            }
            if(askForsecretKeyConfigAllTheDetails)
            {
                arrQues = [
                    {
                        type: 'input',
                        name: 'jwtAccessTokenSecretKey',
                        message: "Please provide the Secret Key config details.\n JWT Access Token Secret Key:"
                    },
                    {
                        type: 'input',
                        name: 'jwtRefreshTokenSecretKey',
                        message: "JWT Refresh Token Secret Key:"
                    },
                    {
                        type: 'input',
                        name: 'cookieSecretKey',
                        message: "Cookie Secret Key:"
                    },
                   
                ]
            }
            if(askForAllTheDetails){
                arrQues = [
                    {
                        type: 'input',
                        name: 'port',
                        message: "Please provide the application config details.\nPort:"
                    },
                    {
                        type: 'input',
                        name: 'apiFolderName',
                        message: "Api Folder Name:"
                    },
                    {
                        type: 'input',
                        name: 'nodeEnviroment',
                        message: "Node Enviroment (development/production):"
                    },{
                        type: 'input',
                        name: 'username',
                        message: "Please provide the DataBase config details.\n UserName : "
                    },
                    {
                        type: 'input',
                        name: 'password',
                        message: "Password : "
                    },
                    {
                        type: 'input',
                        name: 'database',
                        message: "DataBase : "
                    },
                    {
                        type: 'input',
                        name: 'host',
                        message: "host:"
                    },
                    {
                        type: 'input',
                        name: 'dialect',
                        message: "dialect:"
                    },
                    {
                        type: 'input',
                        name: 'jwtAccessTokenSecretKey',
                        message: "Please provide the Secret Key config details.\n JWT Access Token Secret Key:"
                    },
                    {
                        type: 'input',
                        name: 'jwtRefreshTokenSecretKey',
                        message: "JWT Refresh Token Secret Key:"
                    },
                    {
                        type: 'input',
                        name: 'cookieSecretKey',
                        message: "Cookie Secret Key:"
                    },
                   
                ]
            } 
            resolve(arrQues);
        })
    }
    catch (err) {
        throw new Error("permission denied"); // throw an err to ask for the read/write permission
    }
});

var askFortheDetails = async (_queArray) => {

    // get the values from user  configuration.
    await pkg.prompt(_queArray).then(objResponse => {      
        for (const akey in objResponse) {
            Object.keys(configObject).forEach(function (mainkey) {
                Object.keys(configObject[mainkey]).forEach(function (key) {
                    if (Object.hasOwnProperty.call(objResponse, key)) {
                        configObject[mainkey][key] = objResponse[key];
                    }
                });
            });
        }

        console.log(configObject);
        console.log(chalk.green("Config File Generated."));
    })

    fsObj.access(configObject.appConfig.apiFolderName, async (err) => { 
        if (err) {
        // get the api endpoint from user
    fsObj.mkdir(configObject.appConfig.apiFolderName, async (err2) => {
        if (err2) {
            console.log(err2);
        }
    });
        }
    });
    



    var json = JSON.stringify(configObject);
    const textContent = json;
    const position = 0; // Starting position in file
    fsObj.writeFileSync(filePath, textContent);
}


var getCustomCommand = new Promise((resolve,reject) => {

    let customCommand = {};

    if(fsObj.existsSync(commandFolderPath)){

        const commands = fsObj.readdirSync(commandFolderPath);

        commands.forEach(command => {
            
          

            Object.assign(customCommand, {[command]:customCommandFolderName+'/'+command});


        });
    }

    


    resolve(customCommand);
});


var addCustomCommand = async (_commandObject) => {
    
    

    fsObj.accessSync(packagePath, fsObj.constants.R_OK | fsObj.constants.W_OK);
        // read file and fetch the data from the file
        fsObj.readFile(packagePath, 'utf8', (err, data) => {

            if (data) {
            
                var currentPackageObject = JSON.parse(data);

                 binObject =  currentPackageObject?.bin;

                if(currentPackageObject?.bin)
                {
                    Object.keys(currentPackageObject.bin).forEach(function (key) {

                        Object.keys(_commandObject).forEach(function (mainkey) {

                            if(mainkey != key){

                                Object.assign(binObject, {[mainkey]:_commandObject[mainkey]});

                            }
                    
                        });
                    }); 

                    

                    
                
                }else{
                    Object.keys(_commandObject).forEach(function (mainkey) {    

                        
                        var pair = {[mainkey]:_commandObject[mainkey]};

                        binObject = {...binObject, ...pair};
                  

                      
                
                    });
                  
                } 
                
              
                Object.assign(currentPackageObject, {[customCommandFolderName]:binObject});

              

                    var json = JSON.stringify(currentPackageObject);
                    const textContent = json;
                    const position = 0; // Starting position in file
                    fsObj.writeFileSync(packagePath, textContent);
            }
    });

    

    
}






// call the function
checkFortheDataAvailability.then((queArray) => {
   
    if (queArray && queArray.length > 0) {
        askFortheDetails(queArray);
    }


    getCustomCommand.then((command) => {
        
        if(Object.keys(command).length > 0)
        {
            addCustomCommand(command);
        }
    }).then(()=>{
        exec("npm link");
    })
})



