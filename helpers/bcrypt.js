const bcrypt = require('bcryptjs')
const secret = process.env.secret

const hashPassword = (password) => bcrypt.hashSync(password,secret)
const comparePassword = (passwordAsli, hash) => bcrypt.compareSync(passwordAsli,hash)

module.exports={
    hashPassword,
    comparePassword
}