import env from '../../../environment';

const apiEnums = `${env.API_URL}/enums`

export default {
  tiposPessoaListAsync: `${apiEnums}/tipos-pessoa/list`,
  periodicidadesListAsync: `${apiEnums}/periodicidades/list`,
  generosListAsync: `${apiEnums}/generos/list`,
  storageTokenKeyName: 'accessToken'
}