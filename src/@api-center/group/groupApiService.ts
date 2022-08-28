import env from 'environment';

const apiGroups = `${env.API_URL}/groups`

export default {
  listToSelectAsync: `${apiGroups}/list-to-select`,
  listAsync: `${apiGroups}/list`,
  addAsync: `${apiGroups}/create`,
  deleteAsync: `${apiGroups}/delete/`,
  alterStatusAsync: `${apiGroups}/alter-status/`,
  storageTokenKeyName: 'accessToken'
}