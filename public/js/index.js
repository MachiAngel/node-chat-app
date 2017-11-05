var socket = io();

socket.on('connect', function() {
  console.log('Connected to server')

  //連線成功後 發訊息
  // socket.emit('createMessage',{
  //   to:'tim',
  //   text:'安安 你好',
  //   createAt: new Date().getTime()
  // })

})

socket.on('disconnect', function() {
  console.log('disconnect from server');
})

socket.on('newMessage', function(message) {
  console.log('New message',message);

  var li = jQuery('<li></li>')
  li.text(`${message.from}: ${message.text}`)
  jQuery('#messages').append(li)

})


socket.on('newLocationMessage', function(message) {
  console.log('New message',message);

  var li = jQuery('<li></li>')
  var a = jQuery('<a target="_blank">My current location</a>')
  li.text(`${message.from}: `)
  a.attr('href', message.url)
  li.append(a)

  jQuery('#messages').append(li)
})



jQuery('#message-form').on('submit', function(e){
  e.preventDefault()
  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=message]').val()
  },function(){

  })
})

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation){
    return alert('Geolocation not support by ur browser.')
  }

  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage', {
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    })
    console.log(position)

  }, function() {
    alert('Unable to fetch locaion')
  })

})
