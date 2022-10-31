import env from '../../../../environment';

const apiServicos = `${env.API_URL}/servicos`

export default {
  listAsync: `${apiServicos}/list`,
  listToSelectAsync: `${apiServicos}/list-to-select`,
  addAsync: `${apiServicos}/create`,
  deleteAsync: `${apiServicos}/delete/`,
  alterStatusAsync: `${apiServicos}/alter-status/`,
  updateAsync: `${apiServicos}/update`,
  storageTokenKeyName: 'accessToken'
}