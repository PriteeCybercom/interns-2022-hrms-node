const  arg  = require('arg');
const inquirer  = require('inquirer');
const  { exec }   = require("child_process");
const fs = require("fs");
const chalk  = require("chalk");
const path = require("path");
const fse = require('fs-extra');
const appConfig = require('../config/appConfig.json');
const databaseDestination = path.join(path.dirname(__dirname),'db');
/* const ApiTemplate = path.join(path.dirname(__dirname),'src','template','coreApi'); */

/* Console Color Scheme  #START# */

const success = chalk.green;
const error = chalk.red;
const warning = chalk.yellow;

/* Console Color Scheme #END# */

var askForModelName = async () => {   
    
    const questions = [];
    var answers;


    questions.push({
            type : 'input',
            name : 'name',
            message : 'Please Enter Model Name?'
    });
        
    do {
       answers = await inquirer.prompt(questions);
    } while (answers.name == "");


    return  answers.name.toLowerCase();
}


var askForDestination = async (ModulesNames) => {   

    const defaultlocation = 'global';
    
    const questions = [];
    var answers;


    questions.push({
            type : 'list',
            name : 'ModuleName',
            message : 'Please Select Module?',
            choices : ['global',...ModulesNames],
            default : defaultlocation
    });
        
    do {
       answers = await inquirer.prompt(questions);
    } while (answers.ModuleName == "");


    return   answers.ModuleName;
}



var addModeltoGlobal = async (ModelName) => {
    var ModuleCreateCommand = "cd db && npx sequelize-cli model:generate --name "+ModelName+" --attributes deletedAt:Date ";


    await exec(ModuleCreateCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);

            var command ="cd db/ && mkdir migrations && mkdir models && mkdir seeders";

            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                        
        
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
            });

            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(warning("Please Copy & Past following Code in Migration File Which Newly Created"));
        console.log(warning("1) Past this After 'use strict' - const { Sequelize } = require('sequelize'); "));
        console.log(warning("2) Past This in Up And down Function Parameters  - { context: queryInterface }) "));
    }); 
};


var addModelInModule = async (ModuleName , ModelName , ApiFolderName) => {
    var ModuleCreateCommand = "cd "+ApiFolderName+"/"+ ModuleName +" && npx sequelize-cli model:generate --name "+ModelName+" --attributes deletedAt:Date";


    await exec(ModuleCreateCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);

            var command ="cd "+ApiFolderName+"/"+ ModuleName +" && mkdir migrations && mkdir models && mkdir seeders";

            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                        
        
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                
            });

            exec(ModuleCreateCommand, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
        
                    
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                console.log(warning("Please Copy & Past following Code in Migration File Which Newly Created"));
        console.log(warning("1) Past this After 'use strict' - const { Sequelize } = require('sequelize'); "));
        console.log(warning("2) Past This in Up And down Function Parameters  - { context: queryInterface }) "));
            }); 

            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(warning("Please Copy & Past following Code in Migration File Which Newly Created"));
        console.log(warning("1) Past this After 'use strict' - const { Sequelize } = require('sequelize'); "));
        console.log(warning("2) Past This in Up And down Function Parameters  - { context: queryInterface }) "));
    });
};

module.exports.addModel = async (ModelName) => {

    //Modules Array 
    let ModulesName ;
    if (fs.existsSync(appConfig.appConfig.apiFolderName)) {
        ModulesName = fs.readdirSync(appConfig.appConfig.apiFolderName);
    } else {

        console.log(error("Modules Not Found"));
    }




    var ModelName;

    if(!ModelName)
    {
        ModelName = await askForModelName();
    }else{
        ModelName = ModelName.toLowerCase();
    }


    const ModuleName = await askForDestination(ModulesName);
  

   


    if(ModuleName === 'global')
    {

        await addModeltoGlobal(ModelName);

        
        

    
    }else{

        await addModelInModule(ModuleName,ModelName,appConfig.appConfig.apiFolderName);
       
    }



   

    
};

/* 

function parseArgumentsIntoOptions(rawArgs){
    const args = arg(
        {
        },
        {
        argv : rawArgs.slice(2),
        }
    );

    
    return {
         location : args._[1],
        modelName : args._[0], 
    }
}


async function propmtForMissingOptions(options)
{   

    

    
    if(options.skipPromts)
    {
        return {
            ...options,
            location : options.location || defaultlocation,
        }
    }

    let modules ;
    if (fs.existsSync(ModuleFolderName)) {
        modules = fs.readdirSync(ModuleFolderName);
    } else {
        throw new Error("Modules Not Found");
    }



    const questions = [];
    if(!options.template){
        questions.push({
            type : 'list',
            name : 'location',
            message : 'Please choose which Module You Want to Add Model',
            choices : ['global',...modules],
            default : defaultlocation
        })
    }

    const answers = await inquirer.prompt(questions);
    return {
        ...options,
        location : options.location || answers.location,

    };

}

export async function cli(args) {
    let options = parseArgumentsIntoOptions(args);

    options = await propmtForMissingOptions(options);

    var ModuleName = options.location;
    var ModelName = options.modelName;

    
    if(ModuleName != 'global')
    {
        var ModuleCreateCommand = "cd "+ModuleFolderName+"/"+ ModuleName +" && npx sequelize-cli model:generate --name "+ModelName+" --attributes firstName:string";


        exec(ModuleCreateCommand, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
    
                var command ="cd "+ModuleFolderName+"/"+ ModuleName +" && mkdir migrations && mkdir models && mkdir seeders";
    
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                            
            
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                });

                exec(ModuleCreateCommand, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
            
                        
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                }); 
    
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        }); 
    }else{

        var ModuleCreateCommand = "cd db && npx sequelize-cli model:generate --name "+ModelName+" --attributes firstName:string";


        exec(ModuleCreateCommand, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
    
                var command ="cd db/ && npx sequelize init";
    
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.log(`error: ${error.message}`);
                            
            
                        return;
                    }
                    if (stderr) {
                        console.log(`stderr: ${stderr}`);
                        return;
                    }
                    console.log(`stdout: ${stdout}`);
                });
    
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        }); 
    }




    


    console.log(options);

} */