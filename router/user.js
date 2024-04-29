const express = require('express')
const ControllerUser = require('../controller/controllerUser')
const route = express.Router()

route.post('/login', ControllerUser.login)
route.post('/register', ControllerUser.register)

module.exports = route