const endpointAccountPrefix = 'http://localhost:5000/api/v1/account'

export default {
  meEndpoint: '/auth/me',
  loginEndpoint: endpointAccountPrefix + '/authenticate',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken'
}