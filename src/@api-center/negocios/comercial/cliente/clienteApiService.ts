import env from '../../../../environment';

const apiClients = `${env.API_URL}/clientes`

export default {
  listOneTPAsync: `${apiClients}/tp/`,
  listAsync: `${apiClients}/list`,
  listOneAsync: `${apiClients}/list-one/`,
  addAsync: `${apiClients}/create`,
  deleteAsync: `${apiClients}/delete/`,
  alterStatusAsync: `${apiClients}/alter-status/`,
  updateAsync: `${apiClients}/update`,
  storageTokenKeyName: 'accessToken'
}