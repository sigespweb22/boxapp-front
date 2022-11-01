import env from '../../../../../environment';

const fornecedorServicoApiService = `${env.API_URL}/fornecedores-servicos`

export default {
  listToSelectAsync: `${fornecedorServicoApiService}/list-to-select`,
  listAsync: `${fornecedorServicoApiService}/list`,
  addAsync: `${fornecedorServicoApiService}/create`,
  deleteAsync: `${fornecedorServicoApiService}/delete/`,
  alterStatusAsync: `${fornecedorServicoApiService}/alter-status/`,
  updateAsync: `${fornecedorServicoApiService}/update`,
  storageTokenKeyName: 'accessToken'
}