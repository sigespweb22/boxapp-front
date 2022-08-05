const endpointAccountSSLPrefix = 'https://localhost:5001/api/v1/account'
const endpointAccountPrefix = 'http://localhost:5000/api/v1/account'

export default {
  meEndpoint: '/auth/me',
  loginEndpoint: endpointAccountPrefix + '/authenticate',
  // loginEndpoint: '/jwt/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken'
}