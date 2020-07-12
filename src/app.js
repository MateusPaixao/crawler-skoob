const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const app = express()

app.use(cors()) // { origin: 'http://meuapp.com' }
app.use(express.json())
app.use(routes)

module.exports = app