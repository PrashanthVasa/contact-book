var { userSafeQuery } = require('./index')
var { insertQuery } = require('../helpers/dbhelper')

module.exports = {
  'createUser': async (userDetails) => {
    var [insertString, values] = insertQuery(userDetails)
    var query = 'INSERT INTO `users`' + insertString;
    console.log(query)
    try {
      console.debug('Executing ', query)
      await userSafeQuery(query, values)
    } catch (ex) {
      console.error(ex)
      throw ex
    }
  },

  'login': async (email) => {
    var query = 'select * from `users` where `email` = ?';
    try {
      console.debug('Executing ', query)
      var user = await userSafeQuery(query, email)
      return user
    } catch (ex) {
      console.error(ex)
      throw ex
    }
  },
}