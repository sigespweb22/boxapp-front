import env from '../../../../environment';

const apiVendedores = `${env.API_URL}/vendedores`

export default {
  listAsync: `${apiVendedores}/list`,
}