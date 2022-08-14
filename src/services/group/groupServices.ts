const apiGroupsSSL = 'https://localhost:5001/api/v1/groups'
const apiGroups = 'http://localhost:5000/api/v1/groups'

export default {
  listToSelectAsync: apiGroups + '/list',
  storageTokenKeyName: 'accessToken'
}