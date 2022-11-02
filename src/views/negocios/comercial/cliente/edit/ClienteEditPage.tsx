// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Demo Components Imports
import ClienteEditLeft from 'src/views/negocios/comercial/cliente/edit/ClienteEditLeft'
import ClienteEditRight from 'src/views/negocios/comercial/cliente/edit/ClienteEditRight'

interface Props {
    clienteId: string | string [] | undefined
}

const ClienteViewPage = ({ clienteId }: Props) => {
    if (clienteId) {
      return (
          <Grid container spacing={6}>
              <Grid item xs={12} md={5} lg={4}>
                  <ClienteEditLeft id={clienteId} />
              </Grid>
              <Grid item xs={12} md={7} lg={8}>
                <ClienteEditRight id={clienteId} />
              </Grid>
          </Grid>
      )
    } else {
      return null
    }
}

export default ClienteViewPage