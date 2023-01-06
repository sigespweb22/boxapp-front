import env from '../../../../../environment';

const apiVendedoresComissoes = `${env.API_URL}/vendedores-comissoes`

export default {
  listAsync: `${apiVendedoresComissoes}/list/`,
  listOneAsync: `${apiVendedoresComissoes}/list-one/`,
  listToSelectAsync: `${apiVendedoresComissoes}/list-to-select/`,
  addAsync: `${apiVendedoresComissoes}/create`,
  deleteAsync: `${apiVendedoresComissoes}/delete/`,
  alterStatusAsync: `${apiVendedoresComissoes}/alter-status/`,
  updateAsync: `${apiVendedoresComissoes}/update`,
  storageTokenKeyName: 'accessToken'
}