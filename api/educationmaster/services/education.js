const e = require("express")

module.exports.createEducation = async (body) => {
    try {
        
        const response = await framework.db.educationmaster.create({
            title: body.title,
            status: Boolean(body.status),
            deletedAt: null
        });
        return response;
    } catch (e) {
        return e;
    }
}
module.exports.getEducation = async () => {
    try {
        const response = await framework.db.educationmaster.findAll({
            where: {
                deletedAt: null
            }
        });
        return response;
    } catch (e) {
        return e;
    }
}
module.exports.updateEducation = async (body) => {
    try {
        const response = await framework.db.educationmaster.update({
            title: body.title,
            status: Boolean(Number(body.status))
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