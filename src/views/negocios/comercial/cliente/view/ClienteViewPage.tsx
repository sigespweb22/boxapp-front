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
import { RootState, AppDispatch } from 'src/store'

// ** Demo Components Imports
import ClienteViewLeft from 'src/views/negocios/comercial/cliente/view/ClienteViewLeft'

// ** Api services
import clienteApiServices from 'src/@api-center/negocios/comercial/cliente/clienteApiService'

// ** Actions Imports
import { fetchData } from 'src/store/negocios/comercial/cliente/view'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

type Props = ClienteLayoutType & {}

const ClienteViewPage = ({ id }: Props) => {
    // ** State
    const [error, setError] = useState<boolean>(false)
    const [data, setData] = useState<null | ClienteType>(null)

    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.clienteView)

    useEffect(() => {
      dispatch(
        fetchData({
          id: id
        })
      )
    }, [dispatch, id])

    useEffect(() => {
        if(store?.data)
        {
          setData(store.data)
        }
    }, [])

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