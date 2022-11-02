import env from '../../../../../environment';

const apiFornecedoresServicos = `${env.API_URL}/fornecedores-servicos`

export default {
  listAsync: `${apiFornecedoresServicos}/list/`,
  listToSelectAsync: `${apiFornecedoresServicos}/list-to-select`,
  listOneAsync: `${apiFornecedoresServicos}/list-one/`,
  addAsync: `${apiFornecedoresServicos}/create`,
  deleteAsync: `${apiFornecedoresServicos}/delete/`,
  alterStatusAsync: `${apiFornecedoresServicos}/alter-status/`,
  updateAsync: `${apiFornecedoresServicos}/update`,
  storageTokenKeyName: 'accessToken'
}