const express = require('express')
router = express.Router()
const driverController = require('../controllers/driver')
const authMiddle = require('../middlewares/auth')

router.use(authMiddle)

router.get('/:name', (req, res) => {
    driverController.findByName(req, res)
})


router.get('/', (req, res) => {
    driverController.list(req, res)
})

router.put('/', (req, res) => {

    if ((req.body.hasOwnProperty('name'))&&(!req.body.hasOwnProperty('id'))) {
        res.status(422);
        res.json("Invalid request")
    }
    else {
        driverController.update(req, res)
    }
})

router.post('/', (req, res) => {

    const params = JSON.parse(JSON.stringify(req.body))

    if ((!params.hasOwnProperty('name'))) {
        res.status(422);
        res.json("Invalid request")
    }
    else {
        driverController.insert(req, res)
    }


})

router.delete('/:id', (req, res) => {
    if (!req.params.hasOwnProperty('id')) {
        res.status(422);
        res.json("Invalid request")
    }
    else {
        driverController.delete(req, res)
    }
})


module.exports = router