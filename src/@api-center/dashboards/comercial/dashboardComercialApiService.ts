import env from '../../../environment';

const apiDashboardComercial = `${env.API_URL}/dashboard-comercial`

export default {
  clientesContratosNumerosAsync: `${apiDashboardComercial}/clientes-contratos/numeros`,
  clientesContratosValoresAsync: `${apiDashboardComercial}/clientes-contratos/valores`,
  clientesContratosTicketMedioAsync: `${apiDashboardComercial}/clientes-contratos/ticket-medio`,
  storageTokenKeyName: 'accessToken'
}