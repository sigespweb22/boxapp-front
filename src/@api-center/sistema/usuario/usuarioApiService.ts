import env from '../../../environment';

const apiUsers = `${env.API_URL}/users`

export default {
  listOneAsync: `${apiUsers}/list-one`,
  listAsync: `${apiUsers}/list`,
  listToSelectAsync: `${apiUsers}/list-to-select`,
  addAsync: `${apiUsers}/create`,
  updateAsync: `${apiUsers}/update`,
  updateUsuarioContaAsync: `${apiUsers}/conta/update`,
  updateUsuarioSegurancaAsync: `${apiUsers}/seguranca/update`,
  updateUsuarioInfoAsync: `${apiUsers}/info/update`,
  infoListOneAsync: `${apiUsers}/info/list-one`,
  deleteAsync: `${apiUsers}/delete/`,
  alterStatusAsync: `${apiUsers}/alter-status/`,
  contaListOneAsync: `${apiUsers}/conta/list-one`,
  storageTokenKeyName: 'accessToken'
}