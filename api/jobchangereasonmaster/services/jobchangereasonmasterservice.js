// factching get method data from database
module.exports.getdata = async () => {
    return new Promise(async (resolev, reject) => {
      framework.db.jobchangereasonmaster
        .findAll({ raw: true, where: { deletedDate: null } })
        .then((data) => {
          resolev(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  
  // adding data into database post request
  module.exports.postdata = async (bodydata) => {
    return new Promise(async (resolev, reject) => {
      framework.db.jobchangereasonmaster.findOne({ where: { title: bodydata.title, deletedDate: null} })
        .then((data) => {
          if (data == null) {
            framework.db.jobchangereasonmaster
              .create(
                { isActive: bodydata.isActive, title: bodydata.title },
                { raw: true }
              )
              .then((data) => {
                resolev(data);
              })
              .catch((err) => {
                reject(err);
              });
          }else{
            reject("allready present in database")
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  
  // updating
  module.exports.putdata = async (bodydata, id) => {
    return new Promise(async (resolve, reject) => {
      framework.db.jobchangereasonmaster.findOne({ where: { title: bodydata.title, deletedDate: null ,id:{[Op.ne]:id}}}).then((data)=>{
        if(data==null){
          framework.db.jobchangereasonmaster
          .update(
            { title: bodydata.title, isActive: bodydata.isActive },
            { where: { id: id } }
          )
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
        }else{
          reject("allready present in database")
        }
      })
    });
  };
  
  // deleting
  module.exports.deletedata = async (id) => {
    return new Promise((resolve, reject) => {
      framework.db.jobchangereasonmaster
        .update(
          { deletedDate: new Date() },
          { where: { id: id, deletedDate: null } }
        )
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  
  // changeisactive update
  module.exports.updateisactivedata = async (status, id) => {
    return new Promise((resolve, reject) => {
      framework.db.jobchangereasonmaster
        .update({ isActive: status }, { where: { id: id } })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  