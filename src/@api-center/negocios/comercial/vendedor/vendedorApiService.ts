import env from '../../../../environment';

const apiVendedores = `${env.API_URL}/vendedores`

export default {
  listOneTPAsync: `${apiVendedores}/tp/`,
  listToSelectAsync: `${apiVendedores}/list-to-select`,
  listAsync: `${apiVendedores}/list`,
  listOneAsync: `${apiVendedores}/list-one/`,
  addAsync: `${apiVendedores}/create`,
  deleteAsync: `${apiVendedores}/delete/`,
  alterStatusAsync: `${apiVendedores}/alter-status/`,
  updateAsync: `${apiVendedores}/update`,
  storageTokenKeyName: 'accessToken'
}