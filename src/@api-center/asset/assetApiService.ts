const apiAssetsSSL = 'https://localhost:5001/api/v1/ativos'
const apiAssets = 'http://localhost:5000/api/v1/ativos'

export default {
  listAsync: apiAssets + '/list',
  addAsync: apiAssets + '/create',
  deleteAsync: apiAssets + '/delete/',
  alterStatusAsync: apiAssets + '/alter-status/',
  storageTokenKeyName: 'accessToken'
}