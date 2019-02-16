var mysql = require('mysql')

var createPool = () => {
  var pool = mysql.createPool(global.config)
  global.ConnectionPools = pool
}

var safeQuery = (pool, sql, values = [], options = {}) => {
  return new Promise((resolve, reject) => {
    if (!pool) {
      return reject('Invalid connection pool')
    }

    pool.getConnection((err, connection) => {
      if (err) {
        return reject(err)
      }
      var query = {
        sql,
        values,
        ...options
      }
      connection.query(query, (err, results) => {
        connection.release()
        err ? reject(err) : resolve(results)
      })
    })
  })
}

module.exports = {
  createConnectionPool: () => {
    createPool()
  },
  userSafeQuery: (...args) => (
    safeQuery(global.ConnectionPools, ...args)
  ),
}