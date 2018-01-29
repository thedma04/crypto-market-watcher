
import express from 'express';
import http from 'http'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import bodyParser from 'body-parser'
import session from 'express-session'
import models from './models'

import BitcoinExchanges from './coiners/crypto'

import index from './routes'

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
