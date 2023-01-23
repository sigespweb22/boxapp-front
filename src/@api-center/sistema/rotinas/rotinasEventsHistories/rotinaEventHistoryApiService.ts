import env from '../../../../environment';

const ApiRotinaEventHistory = `${env.API_URL}/rotinas-events-histories`

export default {
  listAsync: `${ApiRotinaEventHistory}/list`,
  addAsync: `${ApiRotinaEventHistory}/create`,
  listOneAsync: `${ApiRotinaEventHistory}/list-one`,
  storageTokenKeyName: 'accessToken'
}