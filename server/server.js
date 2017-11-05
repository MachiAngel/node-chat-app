const path = require('path');
const publicPath = path.join(__dirname, '/../public');
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const port = process.env.PORT || 3000

var app = express();
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))


io.on('connection', (socket) => {
  console.log('New user connected');

  //送出
  socket.emit('newMessage', {
    from:'angel',
    text:'long time no see',
    createAt:123
  })


  socket.on('disconnect', () => {
    console.log('client disconnect to server');
  })

  //server端收到client端給的訊息
  socket.on('createMessage', (message) => {
    console.log('createMessage from client:',message)
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createAt: message.createAt
    })
  })



})

server.listen(port, () => {
  console.log(`server is up on port: ${port}`)
})
