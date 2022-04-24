const chalk = require("chalk");

/* 
Author : Darpan Vadher

*******************Controller Example**********************

exports.ControllerFunctionName = async (req,res,next) =>{

  ...Your Code

}

**********Call Database Table for Opration*****************

Global Variable : framework
Database Variable : db
Table Name : product
Function Name : create()

await framework.db.[Table Name].[Database Opration Function];

***********************************************************

**********Call Database Table for Opration*****************

Global Variable : framework
Database Variable : db
Table Name : product
Function Name : create()

await framework.db.[Table Name].[Database Opration Function];

***********************************************************






***********************************************************
*/
module.exports.getEducation = async (req, res, next) => {
  try {
    console.log(chalk.yellow("get Education is calling"));
    const response = await framework.services.moduleServices.education.getEducation();

    res.status(200).json(response);
  } catch (e) {
    console.log(chalk.red(e));
    res.status(400).json(e.message);
  }
}

module.exports.createEducation = async (req, res, next) => {
  try {
    console.log(chalk.yellow("create Education is calling"));
    const exist = await framework.db.educationmaster.findAll({
      where: {
        title: req.body.title
      }
    });
    if (exist.length > 0) {
      res.status(400).json("Education Already Exist");
    } else {
      const response = await framework.services.moduleServices.education.createEducation(req.body);

      res.status(201).json(response);
    }
  } catch (e) {
    console.log(chalk.red(e));
    res.status(400).json(e.message);
  }
}
module.exports.updateEducation = async (req, res, next) => {
  try {
    console.log(chalk.yellow("update Education is calling"));
    const response = await framework.services.moduleServices.education.updateEducation({
      ...req.body,
      id: req.params.id
    });

    res.status(200).json(response);
  } catch (e) {
    console.log(chalk.red(e));
    res.status(400).json(e.message);
  }
}

module.exports.deleteEducation = async (req, res, next) => {
  try {
    console.log(chalk.yellow("delete Education is calling"));
    const response = await framework.db.educationmaster.update({
      deletedAt: new Date()
    }, {
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(response);
  } catch (e) {
    console.log(chalk.red(e));
    res.status(400).json(e.message);
  }
}
 module.exports.patchEducation = async (req, res, next) => {
  try {
    console.log(chalk.yellow("patch Education is calling"));
    const response = await framework.db.educationmaster.update({
      status: Boolean(Number(req.params.status))
    }, {
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(response);
  } catch (e) {
    console.log(chalk.red(e));
    res.status(400).json(e.message);
  }
}






