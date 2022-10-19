// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'

// ** Third Party Components
import axios from 'axios'

// ** Types
import { ClienteLayoutType, ClienteType } from 'src/types/negocios/comercial/cliente/clienteTypes'

// ** Demo Components Imports
import ClienteViewLeft from 'src/views/negocios/comercial/cliente/view/ClienteViewLeft'

// ** Api services
import clienteApiServices from 'src/@api-center/negocios/comercial/cliente/clienteApiService'


type Props = ClienteLayoutType & {}

const ClienteViewPage = ({ id }: Props) => {
    // ** State
    const [error, setError] = useState<boolean>(false)
    const [data, setData] = useState<null | ClienteType>(null)

    useEffect(() => {
        const storedToken = window.localStorage.getItem(clienteApiServices.storageTokenKeyName)!
        
        axios
          .get(`${clienteApiServices.listOneAsync}${id}`, {
            headers: {
                Authorization: "Bearer " + storedToken
            }
          })
          .then(response => {
            debugger
            setData(response.data)
            setError(false)
          })
          .catch(() => {
            setData(null)
            setError(true)
          })
    }, [id])

    if (data) {
      return (
          <Grid container spacing={6}>
              <Grid item xs={12} md={5} lg={4}>
                  <ClienteViewLeft data={data} />
              </Grid>
              <Grid item xs={12} md={7} lg={8}>
                  <Typography variant='h6'>Editar cliente {id}</Typography>
              </Grid>
          </Grid>
      )
    } else if (error) {
      return (
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Alert severity='error'>
              Cliente com o id: {id} não existe. Por favor verifique a listagem de clientes:{' '}
              <Link href='/pages/negocios/comercial/cliente/list'>Lsitagem de clientes</Link>
            </Alert>
          </Grid>
        </Grid>
      )
    } else {
      return null
    }
}

export default ClienteViewPage