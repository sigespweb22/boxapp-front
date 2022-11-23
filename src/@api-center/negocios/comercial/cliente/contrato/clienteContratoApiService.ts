import env from '../../../../../environment';

const apiClientesContratos = `${env.API_URL}/clientes-contratos`

export default {
  listAsync: `${apiClientesContratos}/list/`,
  listOneAsync: `${apiClientesContratos}/list-one/`,
  listToSelectAsync: `${apiClientesContratos}/list-to-select/`,
  addAsync: `${apiClientesContratos}/create`,
  deleteAsync: `${apiClientesContratos}/delete/`,
  alterStatusAsync: `${apiClientesContratos}/alter-status/`,
  updateAsync: `${apiClientesContratos}/update`,
  storageTokenKeyName: 'accessToken'
}