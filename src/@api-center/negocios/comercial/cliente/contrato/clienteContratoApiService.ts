import env from '../../../../../environment';

const apiClientesContratos = `${env.API_URL}/clientes-contratos`

export default {
  sincronizarThirdPartyAsync: `${apiClientesContratos}/sincronizar-third-party`,
  storageTokenKeyName: 'accessToken'
}