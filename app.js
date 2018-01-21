
const express = require('express');
const http = require ('http')

const path = require('path')
const cors = require('cors')
const bitStamp = require('./coiners/bitstamp')

const index =  require('./routes/index');




const app = express();
const server = http.createServer(app)
const io = require('socket.io').listen(server)

app.use(express.static('public'));
app.use('/', index);

bitStamp(io)
io.on('connection', () => {
  console.log('Socket connecteds')
})


app.set('view engine', 'ejs');
server.listen(5000)


// export default app;
