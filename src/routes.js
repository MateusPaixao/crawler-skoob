const express = require('express')
const routes = express.Router()

const SkoobController = require('./controllers/SkoobController')


// listar livros
routes.get('/', SkoobController.index)
routes.get('/reviews', SkoobController.search)

module.exports = routes