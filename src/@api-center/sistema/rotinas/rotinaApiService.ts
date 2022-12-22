import env from '../../../environment';

const rotinaApiService = `${env.API_URL}/rotinas`

export default {
  listAsync: `${rotinaApiService}/list`,
  updateAsync: `${rotinaApiService}/update`,
  alterStatusAsync: `${rotinaApiService}/alter-status`,
  storageTokenKeyName: 'accessToken'
}