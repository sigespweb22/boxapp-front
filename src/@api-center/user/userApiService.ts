const apiUsersSSL = 'https://localhost:5001/api/v1/users'
const apiUsers = 'http://localhost:5000/api/v1/users'

export default {
  listAsync: apiUsers + '/list',
  addAsync: apiUsers + '/create',
  deleteAsync: apiUsers + '/delete/',
  alterStatusAsync: apiUsers + '/alter-status/',
  storageTokenKeyName: 'accessToken'
}