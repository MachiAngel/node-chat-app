const path = require('path');
const publicPath = path.join(__dirname, '/../public');
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const port = process.env.PORT || 3000

//const {generateMessage} = require('./utils/message') 等於下一行
const generateMessage = require('./utils/message').generateMessage
const generateLocationMessage = require('./utils/message').generateLocationMessage
const {isRealString} = require('./utils/validation')
const {Users} = require('./utils/users')

var app = express();
var server = http.createServer(app)
var io = socketIO(server)
var users = new Users()

app.use(express.static(publicPath))


io.on('connection', (socket) => {
  console.log('Server Log : New user connected')

  socket.on('join',(params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required')
    }

    //針對聊天室
    socket.join(params.room)
    users.removeUser(socket.id)
    users.addUser(socket.id, params.name, params.room)

    io.to(params.room).emit('updateUserList', users.getUserList(params.room))

    //io.emit 所有人包含自己 -> io.to('The Office Fans').emit
    //socket.broadcast.emit 所有人不包含自己 -> socket.broadcast.to('The Office Fans').emit
    //socket.emit 給特定一個人 -> 沒寫到有to

    //一旦有A連線,對A發送 welcome
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to chat app'))

    //一旦有A連線, 針對" 房間 "內對除了A以外的發送 new user joined
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`))

    callback()
  })

  //server端收到client端給的訊息
  socket.on('createMessage', (message, callback) => {
    console.log('createMessage from client:',message)

    io.emit('newMessage', generateMessage(message.from, message.text))
    callback()
  })

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
  })

  //user離開網頁後
  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room))
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has leaved`))
    }
  })
  


})

server.listen(port, () => {
  console.log(`server is up on port: ${port}`)
})
