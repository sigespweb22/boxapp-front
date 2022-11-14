import env from '../../../../environment';

const apiChaveApiTerceiro = `${env.API_URL}/chaves-api-terceiro`

export default {
  listToSelectAsync: `${apiChaveApiTerceiro}/list-to-select`,
  listAsync: `${apiChaveApiTerceiro}/list`,
  addAsync: `${apiChaveApiTerceiro}/create`,
  updateAsync: `${apiChaveApiTerceiro}/update`,
  deleteAsync: `${apiChaveApiTerceiro}/delete`,
  alterStatusAsync: `${apiChaveApiTerceiro}/alter-status`,
  storageTokenKeyName: 'accessToken'
}