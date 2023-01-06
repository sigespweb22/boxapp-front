import env from '../../../../../environment';

const apiVendedoresComissoes = `${env.API_URL}/vendedores-comissoes`

export default {
  listAsync: `${apiVendedoresComissoes}/list/`,
  listByVendedorAsync: `${apiVendedoresComissoes}/list-by-vendedor/`,
  listOneAsync: `${apiVendedoresComissoes}/list-one/`,
  alterStatusAsync: `${apiVendedoresComissoes}/alter-status/`,
  storageTokenKeyName: 'accessToken'
}