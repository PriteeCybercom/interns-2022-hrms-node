// factching get method data from database
module.exports.getdata = async () => {
  return new Promise(async (resolev, reject) => {
    framework.db.technologymaster
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
    framework.db.technologymaster
      .findOne({ where: { title: bodydata.title, deletedDate: null } })
      .then((data) => {
        if (data == null) {
          if (bodydata.parentId) {
            framework.db.technologymaster
              .findOne({ where: { id: bodydata.parentId } })
              .then((data) => {
                if (data) {
                  framework.db.technologymaster
                    .create(
                      {
                        isActive: bodydata.isActive,
                        title: bodydata.title,
                        parentId: bodydata.parentId,
                      },
                      { raw: true }
                    )
                    .then((data) => {
                      resolev(data);
                    })
                    .catch((err) => {
                      reject(err);
                    });
                } else {
                  reject("parentId not present in database");
                }
              })
              .catch((err) => {
                reject(err);
              });
          } else {
            framework.db.technologymaster
              .create(
                {
                  isActive: bodydata.isActive,
                  title: bodydata.title,
                  parentId: bodydata.parentId,
                },
                { raw: true }
              )
              .then((data) => {
                resolev(data);
              })
              .catch((err) => {
                reject(err);
              });
          }
        } else {
          reject("allready present in database");
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
    framework.db.technologymaster
      .findOne({
        where: {
          title: bodydata.title,
          deletedDate: null,
          id: { [Op.ne]: id },
        },
      })
      .then((data) => {
        if (data == null) {
          if (bodydata.parentId) {
            framework.db.technologymaster
              .findOne({ where: { id: bodydata.parentId } })
              .then((data) => {
                if (data && bodydata.parentId != id) {
                  framework.db.technologymaster
                    .update(
                      { title: bodydata.title, isActive: bodydata.isActive ,parentId:bodydata.parentId},
                      { where: { id: id } }
                    )
                    .then((data) => {
                      resolve(data);
                    })
                    .catch((err) => {
                      reject(err);
                    });
                } else if (bodydata.parentId == id) {
                  reject("parent id and child id is same");
                } else {
                  reject("parentId not present in database");
                }
              });
          } else {
            framework.db.technologymaster
              .update(
                { title: bodydata.title, isActive: bodydata.isActive ,parentId:bodydata.parentId},
                { where: { id: id } }
              )
              .then((data) => {
                resolve(data);
              })
              .catch((err) => {
                reject(err);
              });
          }
        } else {
          reject("allready present in database");
        }
      });
  });
};

// deleting
module.exports.deletedata = async (id) => {
  return new Promise((resolve, reject) => {
    framework.db.technologymaster
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
    framework.db.technologymaster
      .update({ isActive: status }, { where: { id: id } })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// give parent list 

module.exports.giveparentlist = async () => {
  return new Promise(async (resolve, reject) => {
    framework.db.technologymaster
      .findAll({ attributes:['title','id']}, { where: { deletedDate: null }, raw: true })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};