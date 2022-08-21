const apiGroupsSSL = 'https://localhost:5001/api/v1/groups'
const apiGroups = 'http://localhost:5000/api/v1/groups'

export default {
  listToSelectAsync: apiGroups + '/list-to-select',
  listAsync: apiGroups + '/list',
  addAsync: apiGroups + '/create',
  deleteAsync: apiGroups + '/delete/',
  alterStatusAsync: apiGroups + '/alter-status/',
  storageTokenKeyName: 'accessToken'
}