const  arg  = require('arg');
const inquirer  = require('inquirer');
const  { exec }   = require("child_process");
const fs = require("fs");
const chalk  = require("chalk");
const path = require("path");
const fse = require('fs-extra');
const appConfig = require('../config/appConfig.json');
const databaseDestination = path.join(path.dirname(__dirname),'db');
const ApiTemplate = path.join(path.dirname(__dirname),'src','template','coreApi');


const Sequelize = require('sequelize');
const config = appConfig?.dbConfig;
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const queryInterface = sequelize.getQueryInterface();

const migration  = require('../core/db/migrations');
const models  = require('../core/db/model');

const configFolderName = "config";
const ApplicationAuthConfigFileName = 'authConfig.json';

const filePath = path.join(__dirname,'../',configFolderName,ApplicationAuthConfigFileName);




/* Console Color Scheme  #START# */

const success = chalk.green;
const error = chalk.red;
const warning = chalk.yellow;

/* Console Color Scheme #END# */


var authConfig = {};


if(fs.existsSync('./config/auth.json'))
{ 
	authConfig =  require('../config/auth.json');
}


var askAboutAuthType = async (config) => {

    const defaultType = "withOutDataBase"; 
    
    const questions = [];
    var answers;




    questions.push({
            type : 'list',
            name : 'Authtype',
            message : 'Which Type Authentication Do you Want to Use?',
            choices : ['withDataBase' , 'withoutDataBase'],
            default : defaultType
    });
        
    do {
       answers = await inquirer.prompt(questions);
    } while (answers.name == "");


    return {
        ...config,
        Authtype : answers.Authtype || defaultType,
    }; 



};


var askForOAuthSystem = async (config) => {

    const defaultType = "yes"; 
    
    const questions = [];
    var answers;




    questions.push({
            type : 'list',
            name : 'OAuth',
            message : 'Do you Want to Use OAuth Authentication System?',
            choices : ['yes' , 'no'],
            default : defaultType
    });
        
    do {
       answers = await inquirer.prompt(questions);
    } while (answers.name == "");


    return {
        ...config,
        OAuth : answers.OAuth || defaultType,
    }; 



};



var addWithOutDatabaseAuthSystem = async (CoreApiPath,AuthType) => {

    
    var ApiTemplatePath = path.join(ApiTemplate,AuthType);
    fs.access(CoreApiPath, async (err) => { 
        if (err) {
            await  console.log(error( "coreApi Creating..."));

            fs.mkdir(CoreApiPath, async (err2) => {
                if (err2) {
                    console.log(err2);
                } else {
                    console.log(success("api Folder Created."));  

                    await fse.copy(ApiTemplatePath, CoreApiPath,async function (err) {
                        if (err) {
                        console.error(err);
                        }
                        console.log(success("Core Auth Api Created. Now you can Edit Api According to your need")); 
                    });
                }
            });
        }else{
            console.log(success("api Folder Created."));  

            await fse.copy(ApiTemplatePath, CoreApiPath,async function (err) {
                if (err) {
                console.error(err);
                }
                console.log(success("Core Auth Api Created. Now you can Edit Api According to your need")); 
            });

            return ;
        }
        
    
    
    });
};


var askForTableUseForSystem = async (config) => {

    const defaultType = "yes"; 
    
    const questions = [];
    var answers;




    questions.push({
            type : 'list',
            name : 'OurTable',
            message : 'Do you Want to Use Our Table For Authentication?',
            choices : ['yes' , 'no'],
            default : defaultType
    });
        
    do {
       answers = await inquirer.prompt(questions);
    } while (answers.OurTable == "");


    return {
        ...config,
        OurTable : answers.OurTable || defaultType,
    }; 



};


var addWithDataBaseOurTableAuthSystem = async (CoreApiPath,AuthType,authConfig) => {

    
    var ApiTemplatePath = path.join(ApiTemplate,AuthType);
    var ModelApiTemplatePath = path.join(ApiTemplate,AuthType,'models');
    
    var MigrationApiTemplatePath = path.join(ApiTemplate,AuthType,'migrations');
    var SeederApiTemplatePath = path.join(ApiTemplate,AuthType,'seeders');


    var databaseDestinationModel = path.join(databaseDestination,'models');
    var databaseDestinationMigration = path.join(databaseDestination,'migrations');
    var databaseDestinationSeeder = path.join(databaseDestination,'seeders');
    
    fs.access(CoreApiPath, async (err) => { 
        if (err) {
            await  console.log(error( "coreApi Creating..."));

            fs.mkdir(CoreApiPath, async (err2) => {
                if (err2) {
                    console.log(err2);
                } else {
                    console.log(success("api Folder Created."));  

                    //Copy Api Folder to Core Api Folder
                    await fse.copy(ApiTemplatePath, CoreApiPath,async function (err) {
                        if (err) {
                        console.error(err);
                        }else{
                            //Copy Model to global Db Model
                            await fse.copy(ModelApiTemplatePath, databaseDestinationModel,async function (err) {
                                if (err) {
                                console.error(err);
                                }
                                console.log(success("Auth User Model Added to Global Db Model")); 
                            });

                            //Copy Migration to global Db Migration
                            await fse.copy(MigrationApiTemplatePath, databaseDestinationMigration,async function (err) {
                                if (err) {
                                console.error(err);
                                }
                                console.log(success("Auth User Migration Added to Global Db Migration")); 
                            });

                            //Copy Seeder to global Db Seeder
                            await fse.copy(SeederApiTemplatePath, databaseDestinationSeeder,async function (err) {
                                if (err) {
                                console.error(err);
                                }
                                console.log(success("Auth User Seeder Added to Global Db Seeders")); 
                            });

                           await console.log(success("Core Auth Api Created. Now you can Edit Api According to your need")); 
                        }



                       

                       
                    });

                    
                }
            });
        }else{
            console.log(success("api Folder Created."));  

            //Copy Api Folder to Core Api Folder
            await fse.copy(ApiTemplatePath, CoreApiPath,async function (err) {
               
                if (err) {
                console.error(err);
                }else{
                    await console.log(success("Core Auth Api Created. Now you can Edit Api According to your need"));

                     //Copy Seeder to global Db Seeder
                     await fse.copy(SeederApiTemplatePath, databaseDestinationSeeder,async function (err) {
                        if (err) {
                        console.error(err);
                        }
                        console.log(success("Auth User Seeder Added to Global Db Seeders")); 
                    });

                    //Copy Migration to global Db Migration
                    await fse.copy(MigrationApiTemplatePath, databaseDestinationMigration,async function (err) {
                        if (err) {
                        console.error(err);
                        }
                        console.log(success("Auth User Migration Added to Global Db Migration")); 
                    });

                    //Copy Model to global Db Model
                    await fse.copy(ModelApiTemplatePath, databaseDestinationModel,async function (err) {
                        if (err) {
                        console.error(err);
                        }
                        console.log(success("Auth User Model Added to Global Db Model")); 
                    });

                    

                   

                    
                    
                }               
            });
        }
        
    
    
    });

    return {
        ...authConfig,
        tableName : 'UsersAuth'
    }
};


var askForTableNameForAuth  = async (ModelNames,authConfig) => {

    const defaultType = ModelNames[0]; 
    
    const questions = [];
    var answers;




    questions.push({
            type : 'list',
            name : 'UserTableName',
            message : 'Which Table  Do you Want to Use For Authentication?',
            choices : [...ModelNames],
            default : defaultType
    });
        
    do {
       answers = await inquirer.prompt(questions);
    } while (answers.UserTableName == "");


    return {
        ...authConfig,
        UserTableName : answers.UserTableName || defaultType,
    }; 
    



};



var addColumnInUserTable = async (CoreApiPath,AuthType,authConfig,modelName) => {


    var Name;
    
    var ApiTemplatePath = path.join(ApiTemplate,AuthType);

    
    fs.access(CoreApiPath, async (err) => { 
        if (err) {
            await  console.log(error( "coreApi Creating..."));

            fs.mkdir(CoreApiPath, async (err2) => {
                if (err2) {
                    console.log(err2);
                } else {
                    console.log(success("api Folder Created."));  

                    //Copy Api Folder to Core Api Folder
                    await fse.copy(ApiTemplatePath, CoreApiPath,async function (err) {
                        if (err) {
                        console.error(err);
                        }else{

                           
                            await queryInterface.addColumn(authConfig.UserTableName, 'ekey' , Sequelize.STRING);

                            Name =  await modelName.forEach(element => {
     
                                if(Object.keys(element).find(key => element[key] === authConfig.UserTableName))
                                {
                                    return Object.keys(element).find(key => element[key] === authConfig.UserTableName);
                                }
                                
                            });  

                            console.log(warning("Please Copy & Past Following Line in " +ModelName+ " Model"));
                            console.log(warning("ekey : DataTypes.STRING"));

                            await console.log(success("Core Auth Api Created. Now you can Edit Api According to your need")); 
                        }



                       

                       
                    });

                    
                }
            });
        }else{
            console.log(success("api Folder Created."));  

            //Copy Api Folder to Core Api Folder
            await fse.copy(ApiTemplatePath, CoreApiPath,async function (err) {
               
                if (err) {
                console.error(err);
                }else{
                    
                    const columns = await query.describeTable(authConfig.UserTableName);

                    console.log(columns);
                    
                    await queryInterface.addColumn(authConfig.UserTableName, 'ekey' , Sequelize.STRING);

                    Name =  await modelName.forEach(element => {
     
                        if(Object.keys(element).find(key => element[key] === authConfig.UserTableName))
                        {
                            return Object.keys(element).find(key => element[key] === authConfig.UserTableName);
                            
                        }
                        
                    });    
                    
                    
                    
                    console.log(warning("Please Copy & Past Following Line in" +ModelName+ " Model"));
                    console.log(warning("ekey : DataTypes.STRING"));

                    

                   
                    await console.log(success("Core Auth Api Created. Now you can Edit Api According to your need")); 
                     
                    
                    
                }               
            });
        }
        
    
    
    });

    return {
        ...authConfig,
        ModelName : ModelName
    }
};


module.exports.addAuth = async (arg1) => {

    if (!fs.existsSync(filePath)) {
        // if files does not exists
        fs.writeFileSync(filePath, "");
    }

    const CoreApiPath = path.join(path.dirname(__dirname),'core','api');

     
    
    authConfig = await askAboutAuthType(authConfig);
    
    authConfig = await askForOAuthSystem(authConfig);

    /* if(authConfig.OAuth === 'yes')
    {
        authConfig = await askForWitchOAuthSystem(authConfig);
    } */


    if(authConfig.Authtype === 'withoutDataBase')
    {   
       
        await addWithOutDatabaseAuthSystem(CoreApiPath,authConfig.Authtype);

        return ;

    }else{
        
        authConfig = await askForTableUseForSystem(authConfig);

        if(authConfig.OurTable === 'yes')
        {
            console.log(warning("Create Core Api For Authentication With Our DataBase Table"));


            authConfig = await addWithDataBaseOurTableAuthSystem(CoreApiPath,authConfig.Authtype,authConfig);

     
        }else{
            var modelName  = [];
        (async() => {
            
                await models.forEach(element => {
                       modelName = [...modelName , ...Object.values(element)] ;
                });

        })();


            authConfig = await askForTableNameForAuth(modelName,authConfig);


            authConfig = await addColumnInUserTable(CoreApiPath,authConfig.Authtype,authConfig,modelName);



            /* (async() => {
                await queryInterface.removeColumn(DatabaseConfig.Databasetable, 'ekey', { });
     
                 await queryInterface.addColumn(DatabaseConfig.Databasetable, 'ekey' , Sequelize.STRING);
     
                 await models.forEach(element => {
     
                         if(Object.keys(element).find(key => element[key] === DatabaseConfig.Databasetable))
                         {
                             DatabaseConfig.DatabaseModelName = Object.keys(element).find(key => element[key] === DatabaseConfig.Databasetable);
                             return;
                         }
                         
                     });
     
                     
     
            
                 fs.writeFile('config/auth.json',JSON.stringify(DatabaseConfig), function (err) {
                     if (err) throw err;
                 console.log("Core Api Generated Successfully With  Database Authentication");
                 });
            
                 
     
             })(); */
        }



    }


    



    console.log(authConfig);


    

 

    var json = JSON.stringify(authConfig);
    const textContent = json;
    const position = 0; // Starting position in file
    fs.writeFileSync(filePath, textContent);

   /*  console.log(warning(JSON.stringify(migration)));
    console.log(warning(JSON.stringify(models)));  */   

    console.log("Add Authentication");
    
};






/* const dotEnv = require("dotenv");
const  arg = require('arg');
const  inquirer = require('inquirer');
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const fse = require('fs-extra');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/appConfig.json')[env];


var authConfig = {};
console.log(fs.existsSync('./config/auth.json'));

if(fs.existsSync('./config/auth.json'))
{ 
	authConfig =  require('../config/auth.json');
}



console.log(authConfig);


dotEnv.config();
const ModuleFolderName = process.env.MODULE_FOLDERNAME;
const TemplateFolder = 'template/coreApi/';
const CorePath = path.join(path.dirname(__dirname),'core\\api');
const DbPath = path.join(path.dirname(__dirname),'db');
        

function parseArgumentsIntoOptions(rawArgs){
    const args = arg(
        {

        },
        {
        argv : rawArgs.slice(2),
        }
    );

    
    return {
         authtype : args._[1],
    }
}


async function propmtForMissingOptions(options)
{   
    const defaulttype = 'withoutDatabase';
    var qoptions =['withDataBase','withoutDatabase'];
    if(options.skipPromts)
    {
        return {
            ...options,
            authtype : options.authtype || defaulttype,
        }
    }

    if(authConfig.authtype === 'withDataBase')

    {
    qoptions = ['withoutDatabase'];
        }else if(authConfig.authtype === 'withoutDatabase'){
        qoptions = ['withDataBase'];
        }

  

    const questions = [];
    if(!options.authtype){
        questions.push({
            type : 'list',
            name : 'authtype',
            message : 'Which Type Authentication do you want to use ?',
            choices : qoptions,
            default : defaulttype
        })
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        authtype : options.authtype || answers.authtype,

    };
}


async function propmtForDatabaseOptions(options)
{   
    const defaultconfig = 'yes';
   

    const questions = [];
        questions.push({
            type : 'list',
            name : 'database',
            message : 'Do you Want to use our Table?',
            choices : ['yes','no'],
            default : defaultconfig
        })
   
    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        database : answers.database || defaultconfig,
    };
}



async function propmtForDatabaseTableAndColumn(DatabaseConfig,models)
{   
    const defaulttableName = models[0];




    const questions = [];
        questions.push({
            type : 'list',
            name : 'DatabasetableName',
            message : 'your Have This Table Please Select AnyOne OF Them?',
            choices : models,
            default : defaulttableName
        })
   
    const answers = await inquirer.prompt(questions);
    return {
        ...DatabaseConfig,
        Databasetable : answers.DatabasetableName || defaulttableName,
    };
}

module.exports = async function cli(args) {
    let options = parseArgumentsIntoOptions(args);

    options = await propmtForMissingOptions(options);

    var Authtype = options.authtype;

    switch (Authtype) {
        case "withoutDataBase":

            console.log("With Out Database Auth (CSRF)");
            var srcDir = path.join(path.dirname(__dirname),'src\\'+TemplateFolder+'withoutDataBase') ;
          
            await addWithOutDatabaseFile(CorePath,srcDir);

            break;

        case "withDataBase":

                console.log("With  Database Auth (Encryption Key)");

                

                var srcDir = path.join(path.dirname(__dirname),'src',TemplateFolder,'withDataBase') ;

               

                await addWithDatabaseFile(CorePath,srcDir,DbPath,options);

            break;
    
        default:

            break;
    }

}


async function addWithOutDatabaseFile(CorePath,srcDir){
    try {
        await fse.remove(CorePath)
        console.log('success!')
      } catch (err) {
        console.error(err)
      }
    fs.access(CorePath,  (error) => {      
        // To check if the given directory 
        // already exists or not
        if (error) {
            // If current directory does not exist
            // then create it
             fs.mkdir(CorePath, (error) => {
                    if (error) {
                        console.log(error);
                    } else {
                        // To copy a folder or file  
                          fse.copy(srcDir, CorePath,async function (err) {
                        if (err) {
                        console.error(err);
                        }
                        });
                    }
            });

        } else { 
                    // To copy a folder or file  
                    fse.copy(srcDir, CorePath,function (err) {
                    if (err) {
                        console.error(err);
                    } 
                    });
            }
        }); 


    console.log("Core Api Generated Successfully With withOut Database Authentication");

}


async function addWithDatabaseFile(CorePath,srcDir,DbPath,options){
  
    let DatabaseConfig = await propmtForDatabaseOptions(options);
   

    if(DatabaseConfig.Databasetable === 'yes')
    {
                        fse.copy(srcDir +'/migrations', DbPath +'/migrations',async function (err) {
                            if (err) {
                            console.error(err);
                            }
                        });
                        //Copy Model to global 
                        fse.copy(srcDir +'/models', DbPath +'/models',async function (err) {
                            if (err) {
                            console.error(err);
                            }
                        });
        console.log("Core Api Generated Successfully With  Database Authentication");

    }else{
        var modelName  = [];
        (async() => {
            
                await models.forEach(element => {
                       modelName = [...modelName , ...Object.values(element)] ;
                });

        })();


       DatabaseConfig =  await propmtForDatabaseTableAndColumn(DatabaseConfig,modelName);

      


       (async() => {
           await queryInterface.removeColumn(DatabaseConfig.Databasetable, 'ekey', { });

            await queryInterface.addColumn(DatabaseConfig.Databasetable, 'ekey' , Sequelize.STRING);

            await models.forEach(element => {

                    if(Object.keys(element).find(key => element[key] === DatabaseConfig.Databasetable))
                    {
                        DatabaseConfig.DatabaseModelName = Object.keys(element).find(key => element[key] === DatabaseConfig.Databasetable);
                        return;
                    }
                    
                });

                

       
            fs.writeFile('config/auth.json',JSON.stringify(DatabaseConfig), function (err) {
                if (err) throw err;
            console.log("Core Api Generated Successfully With  Database Authentication");
            });
       
            

        })();









    



    }
    

}



 */