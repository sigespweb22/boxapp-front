import env from '../../../../../../environment';

const apiClientesContratosFaturas = `${env.API_URL}/clientes-contratos-faturas`

export default {
  sincronizarFromThirdPartyAsync: `${apiClientesContratosFaturas}/sincronizar-from-third-party/`,
  updateFromThirdPartyAsync: `${apiClientesContratosFaturas}/update-from-third-party/`,
  listAsync: `${apiClientesContratosFaturas}/list`,
  storageTokenKeyName: 'accessToken'
}