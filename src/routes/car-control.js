const express = require('express')
router = express.Router()
const carsControlController = require('../controllers/car-control')
const authMiddle = require('../middlewares/auth')

router.use(authMiddle)

router.get('/', (req, res) => {
    carsControlController.list(req, res)
})


router.post('/', (req, res) => {

    const params = JSON.parse(JSON.stringify(req.body))

    if ((!params.hasOwnProperty('start')) || (!params.hasOwnProperty('end')) ||
        (!params.hasOwnProperty('driver_id')) || (!params.hasOwnProperty('car_id')) ||
        (!params.hasOwnProperty('description'))) {
        res.status(422);
        res.json("Invalid request")
    }
    else {
        carsControlController.insert(req, res)
    }

})

router.delete('/:id', (req, res) => {
    if (!req.params.hasOwnProperty('id')) {
        res.status(422);
        res.json("Invalid request")
    }
    else {
        carsControlController.delete(req, res)
    }
})


module.exports = router