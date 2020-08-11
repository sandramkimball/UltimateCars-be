const mongoose = require('mongoose')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const body_parser = require('body-parser');

// DB Config
require('dotenv').config()
const URI = process.env.DB_CONNECT

// Routes
var indexRouter = require('./routes/index')
var authRouter = require('./routes/auth')
var vehiclesRouter = require('./routes/vehicles')
var imagesRouter = require('./routes/images')
var dataRouter = require('./routes/data')

// Init app
var app = express()

// Middleware
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended: true}));

// Api Routes
app.use('/', indexRouter)
app.use('/auth', authRouter)
app.use('/vehicles', vehiclesRouter)
app.use('/images', imagesRouter)
app.use('/data', dataRouter)


// DB Connect
mongoose.connect(URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}, ()=> console.log('  ---MONGOOSE: connected') )

const db = mongoose.connection
db.once('open', ()=> console.log('  ---DB Connected'))
db.on('error', err=> console.log('  ---DB ERROR', err))

// Server Port
const PORT = process.env.PORT || 8000
app.listen(PORT, ()=> console.log(`  ---PORT ${PORT}`))

module.exports = app;