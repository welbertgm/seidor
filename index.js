const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

app.use('/users', require('./src/routes/user'))
app.use('/cars', require('./src/routes/car'))
app.use('/drivers', require('./src/routes/driver'))
app.use('/cars-control', require('./src/routes/car-control'))

app.listen(PORT,
    ()=>console.log(`Escutando a porta:${PORT}`))

module.exports = app;