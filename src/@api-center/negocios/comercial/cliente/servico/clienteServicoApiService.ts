import env from '../../../../../environment';

const apiClientesServicos = `${env.API_URL}/clientes-servicos`

export default {
  listAsync: `${apiClientesServicos}/list/`,
  listOneAsync: `${apiClientesServicos}/list-one/`,
  addAsync: `${apiClientesServicos}/create`,
  deleteAsync: `${apiClientesServicos}/delete/`,
  alterStatusAsync: `${apiClientesServicos}/alter-status/`,
  updateAsync: `${apiClientesServicos}/update`,
  storageTokenKeyName: 'accessToken'
}