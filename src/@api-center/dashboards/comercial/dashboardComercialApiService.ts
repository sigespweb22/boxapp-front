import env from '../../../environment';

const apiDashboardComercial = `${env.API_URL}/dashboard-comercial`

export default {
  clientesContratosAsync: `${apiDashboardComercial}/clientes-contratos`,
  storageTokenKeyName: 'accessToken'
}