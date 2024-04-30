const express = require('express')
const ControllerPhone = require('../controller/controllerPhone')
const authentication = require('../middleware/authetication')
const authorization = require('../middleware/authorization')
const route = express.Router()

route.use(authentication)
route.use(authorization)
route.get('/', ControllerPhone.getPhone)
route.post('/', ControllerPhone.addPhone)
route.put('/:id', ControllerPhone.updatePhone)
route.delete('/:id', ControllerPhone.deletePhone)

module.exports = route