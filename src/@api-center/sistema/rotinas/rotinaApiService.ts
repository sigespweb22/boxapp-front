import env from '../../../environment';

const rotinaApiService = `${env.API_URL}/rotinas`

export default {
  dispatchPrefixRoute: `${rotinaApiService}`,
  dispatchclientesSync: `${rotinaApiService}/dispatch-clientes-sync`,
  listAsync: `${rotinaApiService}/list`,
  updateAsync: `${rotinaApiService}/update`,
  alterStatusAsync: `${rotinaApiService}/alter-status`,
  storageTokenKeyName: 'accessToken'
}