const dateUtil = require("../utils/date-utils")
const { v4: uuidv4 } = require('uuid')
const carsControlModel = require('../models/car-control')

exports.insert = (req, res) => {
    try {
        req.body.key = uuidv4()
        const result = carsControlModel.insert(req.body)
        res.status(200).json({
            httpcode: "200",
            status: "success",
            message: "",
            data: result,
            responsetime: dateUtil.LocalDateTime()
        })
    } catch (err) {
        res.status(500).json({ httpcode: "500", status: "Fail", message: err, data: {}, responsetime: dateUtil.LocalDateTime() })
    }

}

exports.delete = async (req, res) => {
    try {
        await carsControlModel.delete(req.params)
        res.status(200).json({
            httpcode: "200",
            status: "success",
            message: "Car control deleted with success.",
            data: "",
            responsetime: dateUtil.LocalDateTime()
        })
    } catch (err) {
        res.status(500).json({ httpcode: "500", status: "Fail", message: err, data: {}, responsetime: dateUtil.LocalDateTime() })
    }
}

exports.list = async (req, res) => {
    try {
        const result = await carsControlModel.list()
        res.status(200).json({
            httpcode: "200",
            status: "success",
            message: "Cars control founded",
            data: result,
            responsetime: dateUtil.LocalDateTime()
        })
    } catch (err) {
        res.status(500).json({ httpcode: "500", status: "Fail", message: err, data: {}, responsetime: dateUtil.LocalDateTime() })
    }
}