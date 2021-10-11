const dateUtil = require("../utils/date-utils")
const { v4: uuidv4 } = require('uuid')
const carModel = require('../models/car')

exports.insert = async (req, res) => {
    try {
        req.body.key = uuidv4()
        await carModel.insert(req.body)
        res.status(200).json({
            httpcode: "200",
            status: "success",
            message: "Car saved.",
            data: req.body.key,
            responsetime: dateUtil.LocalDateTime()
        })
    } catch (err) {
        res.status(500).json({ httpcode: "500", status: "Fail", message: err, data: {}, responsetime: dateUtil.LocalDateTime() })
    }

}

exports.update = async (req, res) => {
    try {
        await carModel.update(req.body)
        res.status(200).json({
            httpcode: "200",
            status: "success",
            message: "Car updated.",
            data: '',
            responsetime: dateUtil.LocalDateTime()
        })
    } catch (err) {
        res.status(500).json({ httpcode: "500", status: "Fail", message: err, data: {}, responsetime: dateUtil.LocalDateTime() })
    }
}

exports.delete = async (req, res) => {
    try {
        await carModel.delete(req.params)
        res.status(200).json({
            httpcode: "200",
            status: "success",
            message: "Car deleted with success.",
            data: "",
            responsetime: dateUtil.LocalDateTime()
        })
    } catch (error) {
        res.status(500).json({ httpcode: "500", status: "Fail", message: err, data: {}, responsetime: dateUtil.LocalDateTime() })
    }
}

exports.list = (req, res) => {
    try {
        const result = carModel.list(req.body)
        res.status(200).json({
            httpcode: "200",
            status: "success",
            message: "Found cars",
            data: result,
            responsetime: dateUtil.LocalDateTime()
        })
    } catch (error) {
        res.status(500).json({ httpcode: "500", status: "Fail", message: error, data: {}, responsetime: dateUtil.LocalDateTime() })
    }
}

exports.findById = async (req, res) => {
    try {
        const result = await carModel.findById(req.params)
        res.status(200).json({
            httpcode: "200",
            status: "success",
            message: "Found car",
            data: result,
            responsetime: dateUtil.LocalDateTime()
        })
    } catch (error) {
        res.status(500).json({ httpcode: "500", status: "Fail", message: error, data: {}, responsetime: dateUtil.LocalDateTime() })
    }
}


