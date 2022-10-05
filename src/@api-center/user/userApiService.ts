import env from '../../environment';

const apiUsers = `${env.API_URL}/users`

export default {
  listAsync: `${apiUsers}/list`,
  listToSelectAsync: `${apiUsers}/list-to-select`,
  addAsync: `${apiUsers}/create`,
  updateAsync: `${apiUsers}/update`,
  deleteAsync: `${apiUsers}/delete/`,
  alterStatusAsync: `${apiUsers}/alter-status/`,
  storageTokenKeyName: 'accessToken'
}