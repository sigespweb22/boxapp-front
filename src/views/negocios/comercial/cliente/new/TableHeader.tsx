import { useEffect, useState, useRef } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip';
import { green } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

// ** Demo Components Imports
import Connection from 'mdi-material-ui/Connection'

// ** Imports Api Services Imports
import clienteApiService from 'src/@api-center/negocios/comercial/cliente/clienteApiService'

// ** Import Axios
import axios from 'axios'

// ** Import Toast
import toast from 'react-hot-toast'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { AppDispatch } from 'src/store'

// ** Actions Imports
import { fetchData } from 'src/store/negocios/comercial/cliente'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Hook
  const { t } = useTranslation()
  
  // ** States
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      '&:hover': {
        bgcolor: green[700],
      },
    }),
  };

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);

      const storageTokenKeyName = window.localStorage.getItem(clienteApiService.storageTokenKeyName)
      const config = {
        headers: {
          Authorization: `Bearer ${storageTokenKeyName}`
        }
      }
      const request = axios.get(clienteApiService.sincronizarThirdPartyAsync, config)
      request
        .then((response) => {
          setSuccess(true);
          setLoading(false);

          dispatch(fetchData({q: ''}))

          toast.success(`Fora(m) sincronizado(s) com sucesso ${response.data.totalSincronizado} cliente(s).`, {
            duration: 12000
          })
          toast.error(`${response.data.totalIsNotDocumento} cliente(s) não fora(m) sincronizado(s), pois não possui CNPJ/CPF.`, {
            duration: 12000,
          })
        }).catch((err) => {
          setSuccess(true);
          setLoading(false);

          const returnObj = Object.entries(err.response.data.errors);
          returnObj.forEach((err: any) => {
            toast.error(err)
          });
        })
    }
  };

  // ** Props
  const { handleFilter, toggle, value } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder={t("Search Client")}
          onChange={e => handleFilter(e.target.value)}
        />
        <Box sx={{ m: 1, position: 'relative' }}>
          <Tooltip title={"Sincronizar clientes com Bom Controle"}>
            <Button
              color="success"
              startIcon={<Connection />}
              variant="contained"
              sx={{mb: 2, ml: 2, buttonSx}}
              disabled={loading}
              onClick={handleButtonClick}
            >
              Sincronizar Bom Controle
            </Button>
          </Tooltip>
          {loading && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: '-12px',
                marginLeft: '-12px',
              }}
            />
          )}
        </Box>
        <Tooltip title={"Adicionar novo cliente"}>
          <Button sx={{ mb: 2, ml: 2 }} onClick={toggle} variant='contained'>
            + {t("Add Client")}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default TableHeader
