const jwt = require('jsonwebtoken')
const authConfig = require('../configs/config.json')
const dateUtil = require('../utils/date-utils')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader)
        return res.status(401).json({ httpcode: "401", status: "fail", message: 'No token provided', data: "", responsetime: dateUtil.LocalDateTime() })

    const parts = authHeader.split(' ')
    if (!parts.length === 2)
        return res.status(401).json({ httpcode: "401", status: "fail", message: 'Token error', data: "", responsetime: dateUtil.LocalDateTime() })

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).json({ httpcode: "401", status: "fail", message: 'Token malformatted', data: "", responsetime: dateUtil.LocalDateTime() })


    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err)
            return res.status(401).json({ httpcode: "401", status: "fail", message: 'Invalid Token', data: "", responsetime: dateUtil.LocalDateTime() })

        req.userid = decoded.id
        return next()

    })


}