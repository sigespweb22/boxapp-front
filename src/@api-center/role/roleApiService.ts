const apiRolesSSL = 'https://localhost:5001/api/v1/roles'
const apiRoles = 'http://localhost:5000/api/v1/roles'

export default {
  listToSelectAsync: apiRoles + '/list-to-select',
  listAsync: apiRoles + '/list',
  addAsync: apiRoles + '/create',
  deleteAsync: apiRoles + '/delete/',
  alterStatusAsync: apiRoles + '/alter-status/',
  storageTokenKeyName: 'accessToken'
}