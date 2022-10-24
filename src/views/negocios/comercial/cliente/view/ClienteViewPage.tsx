// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'

// ** Types
import { ClienteLayoutType, ClienteType } from 'src/types/negocios/comercial/cliente/clienteTypes'


// ** Demo Components Imports
import ClienteViewLeft from 'src/views/negocios/comercial/cliente/view/ClienteViewLeft'

type Props = ClienteLayoutType & {}

const ClienteViewPage = ({ id }: Props) => {
    if (id) {
        return (
            <Grid container spacing={6}>
                <Grid item xs={12} md={5} lg={4}>
                    <ClienteViewLeft id={id} />
                </Grid>
                <Grid item xs={12} md={7} lg={8}>
                    <Typography variant='h6'>Editar cliente {id}</Typography>
                </Grid>
            </Grid>
        )
    } else {
      return null
      
      // return (
      //   <Grid container spacing={6}>
      //     <Grid item xs={12}>
      //       <Alert severity='error'>
      //         Cliente com o id: {id} não existe. Por favor verifique a listagem de clientes:{' '}
      //         <Link href='/pages/negocios/comercial/cliente/list'>Listagem de clientes</Link>
      //       </Alert>
      //     </Grid>
      //   </Grid>
      // )
    }
}

export default ClienteViewPage