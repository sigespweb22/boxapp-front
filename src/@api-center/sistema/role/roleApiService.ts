import env from '../../../environment';

const apiRoles = `${env.API_URL}/roles`

export default {
  listToSelectAsync: `${apiRoles}/list-to-select`,
  listAsync: `${apiRoles}/list`,
  addAsync: `${apiRoles}/create`,
  updateAsync: `${apiRoles}/update`,
  deleteAsync: `${apiRoles}/delete/`,
  alterStatusAsync: `${apiRoles}/alter-status/`,
  storageTokenKeyName: 'accessToken'
}