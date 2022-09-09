import env from '../../environment';

const apiNavigation = `${env.API_URL}/navigation`

export default {
  myMenu: `${apiNavigation}/my-menu`,
  storageTokenKeyName: 'accessToken'
}