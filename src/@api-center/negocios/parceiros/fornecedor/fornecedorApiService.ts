import env from '../../../../environment';

const apiFornecedores = `${env.API_URL}/fornecedores`

export default {
  listOneTPAsync: `${apiFornecedores}/tp/`,
  listAsync: `${apiFornecedores}/list`,
  listOneAsync: `${apiFornecedores}/list-one/`,
  addAsync: `${apiFornecedores}/create`,
  deleteAsync: `${apiFornecedores}/delete/`,
  alterStatusAsync: `${apiFornecedores}/alter-status/`,
  updateAsync: `${apiFornecedores}/update`,
  storageTokenKeyName: 'accessToken'
}