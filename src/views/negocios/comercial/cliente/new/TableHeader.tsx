import { useEffect, useState, useRef, Fragment, SyntheticEvent, MouseEvent, useContext   } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip';
import { orange } from '@mui/material/colors';
import CircularProgress from '@mui/material/CircularProgress';

import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import ButtonGroup from '@mui/material/ButtonGroup'
import ClickAwayListener from '@mui/material/ClickAwayListener'

// ** Icons Imports
import MenuDown from 'mdi-material-ui/MenuDown'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

// ** Demo Components Imports
import Connection from 'mdi-material-ui/Connection'

// ** Imports Api Services Imports
import clienteApiService from 'src/@api-center/negocios/comercial/cliente/clienteApiService'
import clienteContratoApiService from 'src/@api-center/negocios/comercial/cliente/contrato/clienteContratoApiService'

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

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const options = ['Sincronizar Clientes a partir do Bom Controle', 'Sincronizar Contratos a partir do Bom Controle', 'Atualizar Periodicidade Contratos a partir do Bom Controle']

const TableHeader = (props: TableHeaderProps) => {
  // ** Hook
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)
  
  // ** States
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  // ** Ref
  const anchorRef = useRef<HTMLDivElement | null>(null)

  const handleMenuItemClick = (event: SyntheticEvent, index: number) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const buttonSx = {
    ...(success && {
      bgcolor: orange[500],
      '&:hover': {
        bgcolor: orange[700],
      },
    }),
  }

  const sincronizarClientesThirdPartyAsync = () => {
    const storageTokenKeyName = window.localStorage.getItem(clienteApiService.storageTokenKeyName)
    const config = {
      headers: {
        Authorization: `Bearer ${storageTokenKeyName}`
      }
    }
    const request = axios.get(clienteApiService.sincronizarFromThirdPartyAsync, config)
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
          toast.error(err[1], {
            duration: 5000,
          })
        });
      })
  }

  const sincronizarContratosThirdPartyAsync = () => {
    const storageTokenKeyName = window.localStorage.getItem(clienteApiService.storageTokenKeyName)
    const config = {
      headers: {
        Authorization: `Bearer ${storageTokenKeyName}`
      }
    }
    const request = axios.get(clienteContratoApiService.sincronizarFromThirdPartyAsync, config)
    request
      .then((response) => {
        setSuccess(true);
        setLoading(false);

        toast.success(`Fora(m) sincronizado(s) com sucesso ${response.data.totalSincronizado} contrato(s) de cliente(s).`, {
          duration: 12000
        })
      }).catch((err) => {
        setSuccess(true);
        setLoading(false);

        const returnObj = Object.entries(err.response.data.errors);
        returnObj.forEach((err: any) => {
          toast.error(err[1], {
            duration: 12000,
          })
        });
      })
  }

  const atualizarPeriodicidadeContratos = () => {
    const storageTokenKeyName = window.localStorage.getItem(clienteApiService.storageTokenKeyName)
    const config = {
      headers: {
        Authorization: `Bearer ${storageTokenKeyName}`
      }
    }
    const request = axios.get(clienteContratoApiService.updatePeriodicidadeFromThirdPartyAsync, config)
    request
      .then((response) => {
        setSuccess(true);
        setLoading(false);

        toast.success(`Fora(m) atualizados(s) com sucesso ${response.data.totalContratosAtualizados} contrato(s) de cliente(s).`, {
          duration: 12000
        })
      }).catch((err) => {
        setSuccess(true);
        setLoading(false);

        const returnObj = Object.entries(err.response.data.errors);
        returnObj.forEach((err: any) => {
          toast.error(err[1], {
            duration: 12000,
          })
        });
      })
  }

  const handleSincronizar = (indexButtonSelected: EventTarget & HTMLButtonElement) => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);

      const keyButton = indexButtonSelected.getAttribute("data-button-key")
      switch (keyButton) {
        case "0":
          sincronizarClientesThirdPartyAsync()
          break
        case "1":
          sincronizarContratosThirdPartyAsync()
          break
        case "2":
          atualizarPeriodicidadeContratos()
        default:
          return null
      }
    }
  }

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
          <Fragment>
              <ButtonGroup variant='contained' ref={anchorRef} aria-label='split button'>
                {ability?.can('create', 'ac-cliente-page') && 
                    <Button
                      data-button-key={selectedIndex}
                      color="primary"
                      startIcon={<Connection />}
                      variant="contained"
                      sx={{mb: 2, buttonSx}}
                      disabled={loading}
                      onClick={(selectedIndex) => {
                        handleSincronizar(selectedIndex.currentTarget)
                      }}
                    >
                      {options[selectedIndex]}
                    </Button>
                }
                <Button
                  color="primary"
                  disabled={loading}
                  size='small'
                  aria-haspopup='menu'
                  onClick={handleToggle}
                  sx={{mb: 2, buttonSx}}
                  aria-label='select merge strategy'
                  aria-expanded={open ? 'true' : undefined}
                  aria-controls={open ? 'split-button-menu' : undefined}
                >
                  <MenuDown />
                </Button>
              </ButtonGroup>
              <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'bottom' ? 'center right' : 'center bottom' }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id='split-button-menu'>
                          {options.map((option, index) => (
                            <MenuItem
                              key={option}
                              disabled={index === 3}
                              selected={index === selectedIndex}
                              onClick={event => handleMenuItemClick(event, index)}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: orange[500],
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-16px',
                    marginLeft: '-12px',
                  }}
                />
              )}
          </Fragment>
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
