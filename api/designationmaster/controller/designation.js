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


exports.getDesignation = async (req, res, next) => {
  try {
    console.log(chalk.yellow("get Designation is calling"));
    const response = await framework.services.moduleServices.designation.getDesignation();

    res.status(200).json(response);
  } catch (e) {
    console.log(chalk.red(e));
    res.status(400).json(e.message);
  }
}

exports.createDesignation = async (req, res, next) => {
  try {
    console.log(chalk.yellow("create Designation is calling"));
    const exist = await framework.db.designationmaster.findAll({
      where: {
        deletedAt: null,
        title: req.body.title
      }
    }) ?? [];
    if (exist.length > 0 ) {
      throw new Error("Designation Already Exist");
    }
    const response = await framework.services.moduleServices.designation.createDesignation(req.body);

    res.status(201).json(response);
  } catch (e) {
    console.log(chalk.red(e));
    res.status(400).json(e.message);
  }
}

exports.updateDesignation = async (req, res, next) => {
  try {
    console.log(chalk.yellow("update Designation is calling"));
    const exist = await framework.db.designationmaster.findOne({
      where: {
        deletedAt: null,
        title: req.body.title
      }
    }) ?? [];
    if (exist && req.params.id !=exist.id) {
      throw new Error("Designation Already Exist");
    }
    const response = await framework.services.moduleServices.designation.updateDesignation({
      ...req.body,
      id: req.params.id
    });

    res.status(200).json(response);

  } catch (e) {
    console.log(chalk.red(e));
    res.status(400).json(e.message);
  }
}
exports.deleteDesignation = async (req, res, next) => {
  try {
    console.log(chalk.yellow("delete Designation is calling"));

    const response = await framework.db.designationmaster.update({
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
exports.patchDesignation = async (req, res, next) => {
  try {
    console.log(chalk.yellow("patch Designation is calling"));
    const response = await framework.db.designationmaster.update({
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



