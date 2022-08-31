import env from 'environment';

const apiClients = `${env.API_URL}/clientes`

export default {
  listAsync: `${apiClients}/list`,
  addAsync: `${apiClients}/create`,
  deleteAsync: `${apiClients}/delete/`,
  alterStatusAsync: `${apiClients}/alter-status/`,
  updateAsync: `${apiClients}/update`,
  storageTokenKeyName: 'accessToken'
}