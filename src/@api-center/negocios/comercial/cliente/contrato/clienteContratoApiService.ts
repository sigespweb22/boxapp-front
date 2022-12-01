import env from '../../../../../environment';

const apiClientesContratos = `${env.API_URL}/clientes-contratos`

export default {
  sincronizarFromThirdPartyAsync: `${apiClientesContratos}/sincronizar-from-third-party/`,
  updatePeriodicidadeFromThirdPartyAsync: `${apiClientesContratos}/update-periodicidade-from-third-party/`,
  listAsync: `${apiClientesContratos}/list/`,
  listOneAsync: `${apiClientesContratos}/list-one/`,
  listToSelectAsync: `${apiClientesContratos}/list-to-select/`,
  addAsync: `${apiClientesContratos}/create`,
  deleteAsync: `${apiClientesContratos}/delete/`,
  alterStatusAsync: `${apiClientesContratos}/alter-status/`,
  updateAsync: `${apiClientesContratos}/update`,
  storageTokenKeyName: 'accessToken'
}