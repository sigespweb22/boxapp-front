import env from '../../../environment';

const apiRelatorioComercial = `${env.API_URL}/vendedores-relatorios`

export default {
  listComissaoAsync: `${apiRelatorioComercial}/list-comissoes`,
  storageTokenKeyName: 'accessToken'
}