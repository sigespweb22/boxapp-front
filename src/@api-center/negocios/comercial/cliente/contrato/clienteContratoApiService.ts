import env from '../../../../../environment';

const apiClientesContratos = `${env.API_URL}/clientes-contratos`

export default {
  sincronizarFromThirdPartyAsync: `${apiClientesContratos}/sincronizar-from-third-party`,
  updatePeriodicidadeFromThirdPartyAsync: `${apiClientesContratos}/update-periodicidade-from-third-party`,
  storageTokenKeyName: 'accessToken'
}