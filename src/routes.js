const express = require('express')
const routes = express.Router()

const SkoobController = require('./controllers/SkoobController')


// listar livros
routes.get('/reviews', SkoobController.search)

module.exports = routes