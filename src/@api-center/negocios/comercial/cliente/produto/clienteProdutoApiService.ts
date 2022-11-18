import env from '../../../../../environment';

const apiClientesProdutos = `${env.API_URL}/clientes-produtos`

export default {
  listAsync: `${apiClientesProdutos}/list/`,
  listOneAsync: `${apiClientesProdutos}/list-one/`,
  addAsync: `${apiClientesProdutos}/create`,
  deleteAsync: `${apiClientesProdutos}/delete/`,
  alterStatusAsync: `${apiClientesProdutos}/alter-status/`,
  updateAsync: `${apiClientesProdutos}/update`,
  storageTokenKeyName: 'accessToken'
}