const  arg  = require('arg');
const inquirer  = require('inquirer');
const  { exec }   = require("child_process");
const fs = require("fs");
const chalk  = require("chalk");
const path = require("path");
const fse = require('fs-extra');
const appConfig = require('../config/appConfig.json');
const ApiTemplate = path.join(path.dirname(__dirname),'src','template','api');

/* Console Color Scheme  #START# */

const success = chalk.green;
const error = chalk.red;
const warning = chalk.yellow;

/* Console Color Scheme #END# */

/* Ask for Name if Missing*/

var propmtForMissingOptions = async (name) => {   
    
    const questions = [];
    var answers;


    questions.push({
            type : 'input',
            name : 'name',
            message : 'Please Enter Module Name?'
    });
        
    do {
       answers = await inquirer.prompt(questions);
    } while (answers.name == "");


    return  answers.name.toLowerCase();
}

var renametemplateFiles = async (ModulePath , ModuleName) => {

    if(fs.existsSync(ModulePath))
    {   
        const ApiTemplateFolderFile = fs.readdirSync(ModulePath);

      
        ApiTemplateFolderFile.forEach(FileFolder => {

            if(FileFolder != 'route.json')
            {   
                const FolderFolderFile = fs.readdirSync(path.join(ModulePath,FileFolder));

                if(FolderFolderFile.length > 0)
                {
                    FolderFolderFile.forEach(element => {
                       
                        const NewNameFile = element.replace('example_', ModuleName.toLowerCase()) ;

                        fs.rename(path.join(ModulePath,FileFolder,element),path.join(ModulePath,FileFolder,NewNameFile), (err) => {

                            if(err)
                            {
                                console.log(error("Error in File Rename") + err);
                            }

                        
                        });

                    });

                    
                }


            }

            

            
        });

        
    }else{
        console.log(error("Error In Coping Template File..!"));
        return ;
    }



};


var copyApiTemplateToApi = async (ModulePath,ModuleName) => {

    console.log(warning(ModulePath));

    fs.access(ModulePath, async (err) => { 
        if (err) {
            await  console.log(error( ModuleName + " Creating..."));

            
            fs.mkdir(ModulePath, async (err2) => {
                if (err2) {
                    console.log(err2);
                } else {
                    console.log(success(ModuleName + " Folder Created."));  

                    await fse.copy(ApiTemplate, ModulePath,async function (err) {
                        if (err) {
                        console.error(err);
                        }
                        await renametemplateFiles(ModulePath,ModuleName);
                        console.log(success(ModuleName + " Api Created. Now you can Edit Api According to your need")); 
                    });

                     
                    


                    
                }
            });


        }else{
            console.log(error("Api Already Available"));
            return ;
        }
    
    
    
    });



};




module.exports.addModule = async (arg1) => {

    var moduleName;

    if(!arg1)
    {
        moduleName = await propmtForMissingOptions(arg1);
    }else{
        moduleName = arg1.toLowerCase();
    }


    const ModuleFolderPath = path.join(path.dirname(__dirname),appConfig.appConfig.apiFolderName);
    const ModulePath = path.join(path.dirname(__dirname),appConfig.appConfig.apiFolderName,moduleName);



    fs.access(ModuleFolderPath, async (err) => { 
        if (err) {
            await  console.log(error("Api Folder Not Available"));

            
            fs.mkdir(ModuleFolderPath, async (err2) => {
                if (err2) {
                    console.log(err2);
                } else {
                    console.log(success("Api Folder Created!."));

                    await copyApiTemplateToApi(ModulePath,moduleName);
                   
                }
            });


        }else{
            console.log(success("Api Folder  Available"));
            await copyApiTemplateToApi(ModulePath,moduleName);

        }
    
    
    
    });
};