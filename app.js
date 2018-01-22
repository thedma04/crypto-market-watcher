
const express = require('express');
const http = require ('http')

const path = require('path')
const BitcoinExchanges = require('./coiners/crypto')

const index =  require('./routes/index');

const app = express();
const server = http.createServer(app)
const io = require('socket.io').listen(server)

app.use(express.static('public'));
app.use('/', index);


BitcoinExchanges(io)
io.on('connection', (io) => {
  console.log('Server Socket Connected')
})

app.set('view engine', 'ejs');
server.listen(5000)


// export default app;
