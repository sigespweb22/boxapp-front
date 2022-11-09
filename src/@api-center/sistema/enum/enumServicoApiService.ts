import env from '../../../environment';

const apiEnums = `${env.API_URL}/enums`

export default {
  generosListAsync: `${apiEnums}/generos/list`,
  storageTokenKeyName: 'accessToken'
}