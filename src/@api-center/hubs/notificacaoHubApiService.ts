import env from '../../environment';

const apiNotificacaoHub = `${env.WS_URL}`

export default {
  notificacaoHub: `${apiNotificacaoHub}/notificacaoHub`,
  storageTokenKeyName: 'accessToken'
}