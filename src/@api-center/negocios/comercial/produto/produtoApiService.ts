import env from '../../../../environment';

const apiProdutos = `${env.API_URL}/produtos`

export default {
  listAsync: `${apiProdutos}/list`,
  listToSelectAsync: `${apiProdutos}/list-to-select`,
  addAsync: `${apiProdutos}/create`,
  deleteAsync: `${apiProdutos}/delete/`,
  alterStatusAsync: `${apiProdutos}/alter-status/`,
  updateAsync: `${apiProdutos}/update`,
  storageTokenKeyName: 'accessToken'
}