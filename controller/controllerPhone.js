const { Phone } = require('../models/')

class ControllerPhone {
    static async getPhone (req,res,next){
        try {
            let phones = await Phone.findAll()

            res.status(200).json(phones)
        } catch (error) {
            next(error)
        }
    }

    static async addPhone (req,res,next){
        try {
            let { name, type, stock, description} = req.body

            let phone = await Phone.create({ name, type, stock, description, AuthorId: req.user.id })

            res.status(200).json(phone)
        } catch (error) {
            next(error)
        }
    }

    static async updatePhone (req,res,next){
        try {
            let { id } = req.params

            let findPhone = await Phone.findByPk(id)
            if(!findPhone){
                throw {name:"Not Found", message:"Phone not found"}
            }

            let { name, type, stock, description} = req.body

            await Phone.update(
                { name, type, stock, description, AuthorId: req.user.id },
                { where: 
                    { id } 
                }
            )

            res.status(200).json({
                message: `Phone ${findPhone.name} success to update`
            })
        } catch (error) {
            next(error)
        }
    }

    static async deletePhone (req,res,next){
        try {
            let { id } = req.params
            let findPhone = await Phone.findByPk(id)
            if(!findPhone){
                throw {name:"Not Found", message:"Phone not found"}
            }

            await Phone.destroy({where:{id}})

            res.status(200).json({
                message:`Phone ${findPhone.name} success to delete`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ControllerPhone