const express = require('express')
const serverless = require("serverless-http")

const routes = require('./routes')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)
app.use(`/.netlify/functions/api`, routes)

module.exports = app
module.exports.handler = serverless(app)