const e = require("express")

module.exports.createDesignation = async (body) => {
    try {
        
        const response = await framework.db.designationmaster.create({
            title: body.title,
            status: Boolean(body.status),
            deletedAt: null
        });
        return response;
    } catch (e) {
        return e;
    }
}
module.exports.getDesignation = async () => {
    try {
        const response = await framework.db.designationmaster.findAll({
            where: {
                deletedAt: null
            }
        });
        return response;
    } catch (e) {
        return e;
    }
}
module.exports.updateDesignation = async (body) => {
    try {
        const response = await framework.db.designationmaster.update({
            title: body.title,
            status: Boolean(body.status)
        }, {
            where: {
                id: body.id
            }
        });
        return response;
    } catch (e) {
        return e;
    }
}