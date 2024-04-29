const bcrypt = require('bcryptjs')

const hashPassword = (password) => bcrypt.hashSync(password,8)
const comparePassword = (passwordAsli, hash) => bcrypt.compareSync(passwordAsli,hash)

module.exports={
    hashPassword,
    comparePassword
}