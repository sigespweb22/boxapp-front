import env from '../../../../../environment';

const apiFornecedoresProdutos = `${env.API_URL}/fornecedores-produtos`

export default {
  listAsync: `${apiFornecedoresProdutos}/list/`,
  listToSelectAsync: `${apiFornecedoresProdutos}/list-to-select`,
  listOneAsync: `${apiFornecedoresProdutos}/list-one/`,
  addAsync: `${apiFornecedoresProdutos}/create`,
  deleteAsync: `${apiFornecedoresProdutos}/delete/`,
  alterStatusAsync: `${apiFornecedoresProdutos}/alter-status`,
  updateAsync: `${apiFornecedoresProdutos}/update`,
  storageTokenKeyName: 'accessToken'
}