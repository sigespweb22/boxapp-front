import env from '../../../../../environment';

const apiVendedoresContratos = `${env.API_URL}/vendedores-contratos`

export default {
  listAsync: `${apiVendedoresContratos}/list/`,
  listOneAsync: `${apiVendedoresContratos}/list-one/`,
  listToSelectAsync: `${apiVendedoresContratos}/list-to-select/`,
  addAsync: `${apiVendedoresContratos}/create`,
  deleteAsync: `${apiVendedoresContratos}/delete/`,
  alterStatusAsync: `${apiVendedoresContratos}/alter-status/`,
  updateAsync: `${apiVendedoresContratos}/update`,
  storageTokenKeyName: 'accessToken'
}