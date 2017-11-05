var expect = require('expect')

var {generateMessage, generateLocationMessage} = require('./message')


describe('generateMessage', () => {
  it('should generate corrent message object', () => {
    var from = 'jen'
    var text = 'hello im jen'
    var message = generateMessage(from, text)

    expect(typeof(message.createAt)).toBe('number')
    expect(message).toMatchObject({
      from: 'jen',
      text
    });
  })
})

describe('generateLocationMessage', () => {

  it('should generate current location object', () => {
    var from = 'admin'
    var lat = '1'
    var lon = '2'
    var locationMessage = generateLocationMessage(from, lat, lon)
    expect(locationMessage.url).toBe(`https://www.google.com/maps?q${1},${2}`)

  })

})
