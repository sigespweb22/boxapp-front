import env from '../../../environment';

const apiFornecedores = `${env.API_URL}/fornecedores`

export default {
  listAsync: `${apiFornecedores}/list`,
  addAsync: `${apiFornecedores}/create`,
  deleteAsync: `${apiFornecedores}/delete/`,
  alterStatusAsync: `${apiFornecedores}/alter-status/`,
  updateAsync: `${apiFornecedores}/update`,
  storageTokenKeyName: 'accessToken'
}