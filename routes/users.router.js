var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

var usersRouter = require('express').Router()
var { generate } = require('../helpers/response')
var userModel = require('../models/users')


var createUserRecord = async (req, res) => {
  var { details } = req.body
  if (!details || !Object.keys(details).length) {
    var err = 'Invalid or empty details to add'
    console.error(err)
    return res.status(400).json(generate(err, 'failed', null))
  }
  details.password = bcrypt.hashSync(details.password, 10)
  try {
    await userModel.createUser(details)
    res.sendStatus(201)
  } catch (ex) {
    console.error(ex)
    res.status(404).json(generate(ex, 'failed', null))
  }
}

var userLogin = async (req, res) => {
  var { email, password } = req.body
  if (!email || !password) {
    var err = 'Invalid or empty login details'
    console.error(err)
    return res.status(400).json(generate(err, 'failed', null))
  }
  try {
    var user = await userModel.login(email)
    if (!Array.isArray(user) || !user.length) {
      throw 'Incorrect Username'
    }

    var match = bcrypt.compareSync(password, user[0].password)
    if (match) {
      var token = jwt.sign({
        'id': user[0].id
      }, global.config.secret, {
        expiresIn: global.config.tokenExpiry
      })

      var responseObject = { token }
      res.status(200).json(generate(null, 'success', responseObject))
    } else {
      throw 'Incorrect Password';
    }
  } catch (err) {
    console.error(err)
    res.status(404).json(generate(err, 'failed', null))
  }
}

usersRouter.post('/login', userLogin)

// usersRouter.use(authenticate())
usersRouter.post('/', createUserRecord)

module.exports = usersRouter