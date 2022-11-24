import env from '../../../environment';

const apiEnums = `${env.API_URL}/enums`

export default {
  tiposPessoaListAsync: `${apiEnums}/tipos-pessoa/list`,
  generosListAsync: `${apiEnums}/generos/list`,
  storageTokenKeyName: 'accessToken'
}