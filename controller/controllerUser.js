const { comparePassword } = require("../helpers/bcrypt")
const { createToken } = require("../helpers/jsonwebtoken")
const {User} = require("../models/")

class ControllerUser {
    static async login (req,res,next){
        try {
            let { email, password } = req.body
            
            let user = await User.findOne({email})
            if(!user){
                throw {name:'unauthorized', message:'Invalid email/password'}
            }

            let checkPassword = comparePassword(password,user.password)
            if(!checkPassword){
                throw {name:'unauthorized', message:'Invalid email/password'}
            }

            const access_token = createToken({id:user.id})
            res.status(200).json({access_token})
        } catch (error) {
            next(error)
        }
    }

    static async register (req,res,next){
        try {
            let { username ,email, password, role } = req.body
            
            let user = await User.create({ username ,email, password, role })

            res.status(201).json({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerUser