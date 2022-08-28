import env from 'environment';

const apiAssets = `${env.API_URL}/ativos`

export default {
  listAsync: `${apiAssets}/list`,
  addAsync: `${apiAssets}/create`,
  deleteAsync: `${apiAssets}/delete/`,
  alterStatusAsync: `${apiAssets}/alter-status/`,
  storageTokenKeyName: 'accessToken'
}