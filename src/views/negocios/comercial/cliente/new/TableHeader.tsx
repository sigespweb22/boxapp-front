import { useEffect, useState, useRef, Fragment, SyntheticEvent, MouseEvent } from 'react';

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

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const options = ['Sincronizar Clientes Bom Controle', 'Sincronizar Contratos Bom Controle']

const TableHeader = (props: TableHeaderProps) => {
  // ** Hook
  const { t } = useTranslation()
  
  // ** States
  const dispatch = useDispatch<AppDispatch>()
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
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

  const sincronizarContratosThirdPartyAsync = () => {
    alert("Ok")
    setSuccess(true);
    setLoading(false);
    // const storageTokenKeyName = window.localStorage.getItem(clienteApiService.storageTokenKeyName)
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${storageTokenKeyName}`
    //   }
    // }
    // const request = axios.get(clienteApiService.sincronizarThirdPartyAsync, config)
    // request
    //   .then((response) => {
    //     setSuccess(true);
    //     setLoading(false);

    //     dispatch(fetchData({q: ''}))

    //     toast.success(`Fora(m) sincronizado(s) com sucesso ${response.data.totalSincronizado} cliente(s).`, {
    //       duration: 12000
    //     })
    //     toast.error(`${response.data.totalIsNotDocumento} cliente(s) não fora(m) sincronizado(s), pois não possui CNPJ/CPF.`, {
    //       duration: 12000,
    //     })
    //   }).catch((err) => {
    //     setSuccess(true);
    //     setLoading(false);

    //     const returnObj = Object.entries(err.response.data.errors);
    //     returnObj.forEach((err: any) => {
    //       toast.error(err)
    //     });
    //   })
  }

  const handleSincronizar = (indexButtonSelected: EventTarget & HTMLButtonElement) => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      debugger
      if (indexButtonSelected.getAttribute("data-button-key") === "0")
      {
        sincronizarClientesThirdPartyAsync()
      } else if (indexButtonSelected.getAttribute("data-button-key") === "1") {
        sincronizarContratosThirdPartyAsync()
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
          <Tooltip title={"Sincronizar contratos com Bom Controle"}>
            <Fragment>
                <ButtonGroup variant='contained' ref={anchorRef} aria-label='split button'>
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
                                disabled={index === 2}
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
          </Tooltip>
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
