import env from '../environment';

const apiUsers = `${env.API_URL}/account`

export default {
  meEndpoint: '/auth/me',
  loginEndpoint: apiUsers + '/authenticate',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken'
}