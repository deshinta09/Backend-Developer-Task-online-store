const express = require('express')
const route = express.Router()
const routeUser = require('./user')
const routePhone = require('./phone')

route.use('/', routeUser)
route.use('/phones', routePhone)

module.exports = route