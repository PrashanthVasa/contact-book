var indexRouter = require('express').Router()
var users = require('./users.router');

indexRouter.use('/users', users)

module.exports = indexRouter