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
  var formattedTime = moment(message.createAt).format('h:mm a')
  var li = jQuery('<li></li>')
  li.text(`${message.from} ${formattedTime}: ${message.text}`)
  jQuery('#messages').append(li)

})


socket.on('newLocationMessage', function(message) {
  console.log('New message',message);

  var formattedTime = moment(message.createAt).format('h:mm a')

  var li = jQuery('<li></li>')
  var a = jQuery('<a target="_blank">My current location</a>')
  li.text(`${message.from} ${formattedTime}: `)
  a.attr('href', message.url)
  li.append(a)

  jQuery('#messages').append(li)
})

  var messageTextbox = $('[name=message]')

$('#message-form').on('submit', function(e){
  e.preventDefault()
  socket.emit('createMessage',{
    from: 'User',
    text: messageTextbox.val()
  },function(){
    messageTextbox.val('')
  })
})


var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation){
    return alert('Geolocation not support by ur browser.')
  }

  //jq 方法
  locationButton.attr('disabled', 'disabled').text('Sending location...')

  navigator.geolocation.getCurrentPosition(function(position) {

    locationButton.removeAttr('disabled').text('Send location')
    socket.emit('createLocationMessage', {
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    })
    console.log(position)

  }, function() {
    locationButton.removeAttr('disabled').text('Send location')
    alert('Unable to fetch locaion')
  })

})
