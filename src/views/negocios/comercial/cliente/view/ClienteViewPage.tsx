// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import ClienteViewLeft from 'src/views/negocios/comercial/cliente/view/ClienteViewLeft'

interface Props {
    clienteId: string | string [] | undefined
}

const ClienteViewPage = ({ clienteId }: Props) => {
    if (clienteId) {
      return (
          <Grid container spacing={6}>
              <Grid item xs={12} md={5} lg={4}>
                  <ClienteViewLeft id={clienteId} />
              </Grid>
              <Grid item xs={12} md={7} lg={8}>
                  <Typography variant='h6'>Editar cliente {clienteId}</Typography>
              </Grid>
          </Grid>
      )
    } else {
      return null
    }
}

export default ClienteViewPage