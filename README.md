# HRMS Node Setup

This is Basic Node Setup For HRMS.In This Setup We Created Our Own Custom Command For Doing Simple Task Very Easily.

<br>

<h1>How to Run Node Setup</h1><br>

- Clone Source Code Or Download Zip File & Extract In Folder.
- Open Terminal in Project Folder.
- Run Node Command

    ```` 
    npm install 
    ````

<br>
<h2>How to Use Our Custom Commands</h2><hr><br>

```
framework [command] [arguments]
```

-  Command List 
    - use This Command For add New Module In Project <br><br>
    
    ```
        framework addModule [ModuleName]
    ```

    -  use This Command For add New Authentication     System 
    <br><br>
    ```
        framework addAuth
    ```
    -  use This Command For Add New Model
    <br><br>
    ```
        framework addModel [ModelName]
    ```
    
 



<!-- <h3>for using my own command run </h3> -->


<!-- npm link


<h1>how to add authantication</h1><hr><br>




command-addauth

<h3>there is a 2 method for authantication</h3>
<hr><br>

- for using your own database schema , let start your project with

npm start

and migrate all your remaining migrations and exit from project and run command 

command-addauth

and select your own model for authantication implementation
- if you want to use our database schema then first run command

command-addauth

and select authantication with database and select our model for authantication and start the server to run your project
- use static authantication without database and use it simple and fast

<h1>Add migrations,seeders,model<h1>
<h4>


Migrations and Model:

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

Seders:
npx sequelize-cli seed:generate --name demo-user


select a suitabkle location for this migrations from API folder or from root database folders
<h4>

<h1>Add Module in API folder</h1>


command-addmodule -->

<!-- it will generate complete folder structure of module into your API folder and also generate routes file and structure

<h1>How to use route.JSON file<h1>
<h3>route.json file structure</h3>


{
        "method": "get",
        "path": "/user",
        "controller": "userc.done",
        "middlewares": [
            "auth.validate",
            "auth.check"
        ],
        "access":[
            "admin"
        ],
        "isgloblal":true
    }


- method - (post,get,put,delete,patch)
- path   - (denote a endpoint)
- controller - (controller_filename.functionname) it will be            from module controller folder 
(name of the controller [name.js])
- middlewares - (middlewares_filename.functionname) it will be from
module middlewares function
- access  - (role of user who can access the endpoint)
- isgloblal - (true) it means that global endpoint with /path
            (false)  it means it module endpoint module_name+/path -->

<!-- <h1>How to use Global properties</h1>

- global service

  
  framework.service.file_name.function_name
  

- global function


    framework.ufunction.function_file_name.function_name

it also suuport itterate structure of folders - you can access function

 with 
 
 
 framework.ufunction.folder_name.function_file_name.function_name

- global core function


framework.corefunction.function_name


-module service and function


function:
 framework.module_name.modulefunction.file_name.function_name -->


