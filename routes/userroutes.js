const express = require('express')
const handleUserSignup = require('../controller/usercontrol')
const router = express.Router()

router.post('/', handleUserSignup)

module.exports = router