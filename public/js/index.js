var socket = io();

socket.on('connect', function() {
  console.log('Connected to server')

  //連線成功後 發訊息
  socket.emit('createMessage',{
    to:'tim',
    text:'安安 你好',
    createAt: new Date().getTime()
  })

})

socket.on('disconnect', function() {
  console.log('disconnect from server');
})

socket.on('newMessage', function(message) {
  console.log('New message',message);
})
