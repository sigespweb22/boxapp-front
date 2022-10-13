import env from '../../../../environment';

const apiPipelines = `${env.API_URL}/pipelines`

export default {
  listToSelectAsync: `${apiPipelines}/list-to-select`,
  listAsync: `${apiPipelines}/list`,
  addAsync: `${apiPipelines}/create`,
  updateAsync: `${apiPipelines}/update/`,
  deleteAsync: `${apiPipelines}/delete/`,
  alterStatusAsync: `${apiPipelines}/alter-status/`,
  storageTokenKeyName: 'accessToken'
}