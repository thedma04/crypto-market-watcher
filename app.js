'use strict';
require('babel-core/register');
require('babel-polyfill');

const express = require('express');
const http = require('http')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const bodyParser = require('body-parser')
const session = require('express-session')
const path = require('path')
const models = require('./models')

const BitcoinExchanges = require('./coiners/crypto')

const index =  require('./routes/index');
//  import cookieParser from 'cookie-parser';

const app = express();
const server = http.createServer(app)
const io = require('socket.io').listen(server)

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser())
app.use(session({secret: 'dkdkdkdkdkdkdkdkdkdkdkdkdkd'}))
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())
app.use('/', index);


BitcoinExchanges(io)
io.on('connection', (io) => {
  console.log('Server Socket Connected')
})

models.sequelize.sync().then(() => {
  server.listen(5000)  
}).catch(err => console.log(err))


// export default app;
