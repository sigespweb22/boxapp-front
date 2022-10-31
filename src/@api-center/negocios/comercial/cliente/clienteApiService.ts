import env from '../../../../environment';

const apiClientes = `${env.API_URL}/clientes`

export default {
  listOneTPAsync: `${apiClientes}/tp/`,
  listToSelectAsync: `${apiClientes}/list-to-select`,
  listAsync: `${apiClientes}/list`,
  listOneAsync: `${apiClientes}/list-one/`,
  addAsync: `${apiClientes}/create`,
  deleteAsync: `${apiClientes}/delete/`,
  alterStatusAsync: `${apiClientes}/alter-status/`,
  updateAsync: `${apiClientes}/update`,
  storageTokenKeyName: 'accessToken'
}