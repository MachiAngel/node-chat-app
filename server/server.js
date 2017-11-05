const path = require('path');
const publicPath = path.join(__dirname, '/../public');
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const port = process.env.PORT || 3000

//const {generateMessage} = require('./utils/message') 等於下一行
const generateMessage = require('./utils/message').generateMessage

var app = express();
var server = http.createServer(app)
var io = socketIO(server)

app.use(express.static(publicPath))


io.on('connection', (socket) => {
  console.log('New user connected')

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'))

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

  //server端收到client端給的訊息
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage from client:',message)

    io.emit('newMessage', generateMessage(message.from, message.text))
    callback('this is from server')
    // socket.broadcast.emit('newMessage',{
    //   from: message.from,
    //   text: message.text,
    //   createAt: new Date().getTime()
    // })

  })

  socket.on('disconnect', () => {
    console.log('client disconnect to server');
  })



})

server.listen(port, () => {
  console.log(`server is up on port: ${port}`)
})
