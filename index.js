var express = require('express')
var logger = require('morgan')

var indexRouter = require('./routes')
var { createConnectionPool } = require('./models')

//Set up configuration
require('./config/config')

var app = express()
var port = process.env.PORT || 3000;

// Initializing connection pool
createConnectionPool()


app.use(logger('short'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


// Routing
app.get('/hello', (req, res) => res.send('Hello World'))
app.use('/',indexRouter)


// error handler as 404
app.use(function(req, res, next) {
  next(createError(404))
})

// Connection Check
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
}) 

