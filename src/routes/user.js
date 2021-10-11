const express = require('express')
router = express.Router()
const authConfig = require('../configs/config.json')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const dateUtil = require("../utils/date-utils")

router.get('/me', (req, res) => {

    const token = jwt.sign({ id: uuidv4() }, authConfig.secret, { expiresIn: authConfig.token_expires })
    res.status(200).json({
        httpcode: '200',
        status: 'success',
        message: 'Logged with Success.',
        data: token,
        responsetime: dateUtil.LocalDateTime()
    })

})

module.exports = router