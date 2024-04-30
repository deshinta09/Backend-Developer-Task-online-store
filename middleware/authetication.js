const { compareToken } = require("../helpers/jsonwebtoken")
const { User } = require('../models/')

async function authentication (req,res,next){
    try {
        let { authorization } = req.headers
        if(!authorization){
            throw {name : 'unauthorized', message:"Invalid Token"}
        }

        let checkToken = compareToken(authorization.split(' ')[1])
        if(!checkToken){
            throw {name : 'unauthorized', message:"Invalid Token"}
        }

        let user = await User.findByPk(checkToken.id)
        req.user = {
            id : user.id
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication