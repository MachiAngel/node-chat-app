const expect = require('expect')

const {Users} = require('./users')

describe('Users', () => {

  var users;
  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: '1',
      name: 'angel',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'tim',
      room: 'React Course'
    }, {
      id: '3',
      name: 'mike',
      room: 'Node Course'
    }]
  })

  it('should add new user', () => {
    var users = new Users()
    var user = {
      id: '123',
      name: 'angel',
      room: 'The Office Fans'
    }
    var resUser = users.addUser(user.id, user.name, user.room)
    expect(users.users).toEqual([user])

  })

  //移除user方法測試
  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId)
    expect(user.id).toBe(userId)
    expect(users.users.length).toBe(2)
  })

  it('should not remove a user', () => {

    var userId = '9';
    var user = users.removeUser(userId)
    expect(user).toEqual(undefined)
    expect(users.users.length).toBe(3)

  })

  //找user方法測試
  it('should find user', () => {
    var userOfAngel = users.getUser('1')
    expect(userOfAngel.name).toEqual('angel')

  })

  it('should not find user', () => {
    var userOfAngel = users.getUser('212121')
    expect(userOfAngel).toEqual(undefined)

  })


  //拿到房間內所有人名測試
  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course')
    expect(userList).toEqual(['angel','mike'])

  })

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course')
    expect(userList).toEqual(['tim'])

  })

})
