const express = require('express')
router = express.Router()
const carController = require('../controllers/car')
const authMiddle = require('../middlewares/auth')


router.use(authMiddle)

router.get('/:id', (req, res) => {
    carController.findById(req, res)
})


router.get('/', (req, res) => {
    if (!req.body.hasOwnProperty('color') && (!req.body.hasOwnProperty('brand'))) {
        res.status(422)
        res.json("Invalid request.")
    }
    else {
        carController.list(req, res)
    }
})

router.put('/', (req, res) => {

    const params = JSON.parse(JSON.stringify(req.body))

    if ((!params.hasOwnProperty('license_plate')) || (!params.hasOwnProperty('color')) ||
        (!params.hasOwnProperty('brand')) || (!params.hasOwnProperty('id'))) {

        res.status(422);
        res.json("Invalid request")
    }
    else {
        carController.update(req, res)
    }
})

router.post('/', (req, res) => {

    const params = JSON.parse(JSON.stringify(req.body))

    if ((!params.hasOwnProperty('license_plate')) || (!params.hasOwnProperty('color')) ||
        (!params.hasOwnProperty('brand'))) {
        res.status(422);
        res.json("Invalid request")
    }
    else {
        carController.insert(req, res)
    }


})

router.delete('/:id', (req, res) => {
    if (!req.params.hasOwnProperty('id')) {
        res.status(422);
        res.json("Invalid request")
    }
    else {
        carController.delete(req, res)
    }
})


module.exports = router