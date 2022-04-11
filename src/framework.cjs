const  arg  = require('arg');
const inquirer  = require('inquirer');
const  { exec }   = require("child_process");
const fs = require("fs");
const chalk  = require("chalk");
const path = require("path");
const fse = require('fs-extra');


/* Console Color Scheme  #START# */

const success = chalk.green;
const error = chalk.red;
const warning = chalk.yellow;

/* Console Color Scheme #END# */


/* Custom Command Import #START# */

const { addModule } = require('./addModule');
const { addAuth } = require('./addAuth');
const { addModel } = require('./addModel');
const { addFileUpload } = require('./addFileUpload');
const { help } = require('./help');



/* Custom Command Import #END# */



var parseArgumentsIntoOptions =  async function (rawArgs){
    const args = arg(
        { 
        },
        {
        argv : rawArgs.slice(2),
        }
    );
    
    return {
        command : args._[0],
        commandArg1 : args._[1]
    }
}






module.exports.cli = async (args) => {

    let options = await parseArgumentsIntoOptions(args);

    let optionsCommand = options.command;


    switch (optionsCommand) {
        case "addModule":
                addModule(options.commandArg1);
            break;

        case "addAuth":
                addAuth();
            break;      

        case "addModel":
                addModel(options.commandArg1);
            break;
        
        case "addFileUpload":
                addFileUpload(options.commandArg1);
            break;
            
        case "help":
                help();
            break;

        default:
                help();
            break;
    }




/*     console.log(warning(JSON.stringify(options)));
    console.log(success("FrameWork")); */   
};
    
    