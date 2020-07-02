var mongoose = require('mongoose')
var createError = require('http-errors')
var express = require('express')
var logger = require('morgan')
var cors = require('cors')

// Init app
var app = express()

// DB Config
require('dotenv').config()
const URI = process.env.DB_CONNECT

// Routes
var indexRouter = require('./routes/index')
var authRouter = require('./routes/auth')
var vehiclesRouter = require('./routes/vehicles')
var userRouter = require('./routes/user')
var imagesRouter = require('./routes/images')

// Add Middleware
app.use(cors())
app.use(logger('dev'))
app.use(express.json())

// Api Routes
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/vehicles', vehiclesRouter)
app.use('/images', imagesRouter)

// Handle 404 Error
app.use( (req, res, next) => {
    next(createError(404))
})

app.use( (err,req,res, next) => {
    // only in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? error : {}

    // render error pg
    res.status(err.status || 500)
    res.render('error')
})

// DB Connect
mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, ()=> console.log('  ---MONGOOSE: connected') )

const db = mongoose.connection
db.once('open', ()=> console.log('  ---DB Connected'))
db.on('error', err=> console.log('  ---DB ERROR', err))

// Server Port
const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`  ---PORT ${PORT}`))

module.exports = app;