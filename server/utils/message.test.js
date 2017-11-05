var expect = require('expect')

var {generateMessage} = require('./message')


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
