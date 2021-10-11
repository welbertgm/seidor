const dateUtil = require("../utils/date-utils")
const { v4: uuidv4 } = require('uuid')
const driverModel = require('../models/driver')

exports.insert = async (req, res) => {
    try {
        req.body.key = uuidv4()
        await driverModel.insert(req.body)
        res.status(200).json({
            httpcode: "200",
            status: "success",
            message: "Driver is saved.",
            data: req.body.key,
            responsetime: dateUtil.LocalDateTime()
        })
    } catch (err) {
        res.status(500).json({ httpcode: "500", status: "Fail", message: err, data: {}, responsetime: dateUtil.LocalDateTime() })
    }

}

exports.update = async (req, res) => {
    try {
        await driverModel.update(req.body)
        res.status(200).json({
            httpcode: "200",
            status: "success",
            message: "Driver updated.",
            data: '',
            responsetime: dateUtil.LocalDateTime()
        })
    } catch (err) {
        res.status(500).json({ httpcode: "500", status: "Fail", message: err, data: {}, responsetime: dateUtil.LocalDateTime() })
    }
}

exports.delete = async (req, res) => {
    try {
        await driverModel.delete(req.params)
        res.status(200).json({
            httpcode: "200",
            status: "success",
            message: "Driver deleted with success.",
            data: "",
            responsetime: dateUtil.LocalDateTime()
        })
    } catch (err) {
        res.status(500).json({ httpcode: "500", status: "Fail", message: err, data: {}, responsetime: dateUtil.LocalDateTime() })
    }
}

exports.list = async (req, res) => {
    try {
        const result = await driverModel.list(req.params)
        res.status(200).json({
            httpcode: "200",
            status: "success",
            message: "Drivers found",
            data: result,
            responsetime: dateUtil.LocalDateTime()
        })
    } catch (error) {
        res.status(500).json({ httpcode: "500", status: "Fail", message: error, data: {}, responsetime: dateUtil.LocalDateTime() })
    }
}

exports.findByName = (req, res) => {
    try {
        const result = driverModel.findByName(req.params)
        res.status(200).json({
            httpcode: "200",
            status: "success",
            message: "Driver found",
            data: result,
            responsetime: dateUtil.LocalDateTime()
        })
    } catch (error) {
        res.status(500).json({ httpcode: "500", status: "Fail", message: error, data: {}, responsetime: dateUtil.LocalDateTime() })
    }
}