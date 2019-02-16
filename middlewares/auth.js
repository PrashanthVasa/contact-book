var jwt = require('jsonwebtoken');

module.exports = () => {
  return async (req, res, next) => {
    let token = req.headers['authorization']
    if (!token) {
      console.error('Token not provided')
      return res.status(401).send('No token provided.')
    }
    token = token.split(' ')
    token = token.length > 1 ? token[1] : token[0]

    let decoded = ''
    try {
      console.log(global.config.secret)
      decoded = jwt.verify(token, global.config.secret)
    } catch(err) {
      console.log(err)
      return res.status(500).json({
        'status': 'failed',
        'message': err
      })
    }
    req.data = decoded // Stores the loggedin users details in request object
    console.log(req.data)
    next();
  }
}