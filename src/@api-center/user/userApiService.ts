import env from '../../environment';

const apiUsers = `${env.API_URL}/users`

export default {
  listAsync: `${apiUsers}/list`,
  addAsync: `${apiUsers}/create`,
  deleteAsync: `${apiUsers}/delete/`,
  alterStatusAsync: `${apiUsers}/alter-status/`,
  storageTokenKeyName: 'accessToken'
}