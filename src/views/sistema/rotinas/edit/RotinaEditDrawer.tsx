// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import { Autocomplete } from '@mui/material'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'
import { AppDispatch } from 'src/store'

// ** Actions Imports
import { updateRotina } from 'src/store/sistema/rotina/index'

// ** Custom Component Imports
import PickerTime from '../components/relogioCronograma/PickerTime'

// ** Types
import { RotinaType } from 'src/types/sistema/rotinas/rotinaType'
// ** Axios Imports
import axios from 'axios'

// ** Api Services
import apiVendedores from 'src/@api-center/negocios/comercial/vendedor/vendedorApiService'

interface RotinaEditType {
  row: RotinaType | undefined
  open: boolean
  toggle: () => void
}

interface VendedorTypeSelect {
  id: string
  nome: string
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const defaultValues = {
  id: '',
  nome: '',
  descricao: '',
  observacao: '.',
  chaveSequencial: '',
  dataCompetenciaInicio: '',
  dataCompetenciaFim: '',
  periodicidade: '',
  horaExecucao: '',
  property: { id: '', nome: '' },
  status: ''
}

const RotinaEditDrawer = (props: RotinaEditType) => {
  // ** Hook
  const { t } = useTranslation()
  const [periodicidade, setPeriodicidade] = useState<string | null>()
  const [propertyId, setPropertyId] = useState<string>()
  const [vendedores, setVendedores] = useState<VendedorTypeSelect[] | undefined>()

  // ** Props
  const { open, toggle } = props

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const { reset, control, setValue, handleSubmit } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange'
  })

  // ** Trazer as periodicidades do backend
  const periodicidades = ['DIARIA', 'SEMANAL', 'MENSAL']

  const onSubmit = (data: RotinaType) => {
    dispatch(updateRotina({ ...data }))
    toggle()
    reset()
  }

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(apiVendedores.storageTokenKeyName)!}`
    }
  }

  useEffect(() => {
    if (props?.row) {
      setValue('id', props?.row?.id || '')
      setValue('nome', props?.row?.nome || '')
      setValue('descricao', props?.row?.descricao || '')
      setValue('observacao', props?.row?.observacao || '')
      setValue('dataCompetenciaInicio', props?.row?.dataCompetenciaInicio || '')
      setValue('dataCompetenciaFim', props?.row?.dataCompetenciaFim || '')
      setValue('chaveSequencial', props?.row?.chaveSequencial || '')
      setValue('chaveSequencial', props?.row?.chaveSequencial || '')
      setValue('periodicidade', props?.row?.periodicidade || '')
      setValue('horaExecucao', props?.row?.horaExecucao || '')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  useEffect(() => {
    axios.get(`${apiVendedores.listToSelectAsync}`, config).then(response => {
      setVendedores(response.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>{t('Routine Edit')}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='id'
              control={control}
              render={({ field: { value } }) => <TextField disabled label='Id' value={value} />}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='nome'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  label={t('Name')}
                  placeholder={t('(e.g.: Client synchronization)')}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='dataCompetenciaInicio'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField value={value} onChange={onChange} type='date' label={t('Start date period')} />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='dataCompetenciaFim'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField type='date' label={t('Start date period')} value={value} onChange={onChange} />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='descricao'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  label={t('Description')}
                  placeholder={t('(e.g.: This routine inserts new customers)')}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='observacao'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  label={t('Note')}
                  placeholder={t('(e.g.: This routine can change important customer base data)')}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='chaveSequencial'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled={false}
                  value={value}
                  onChange={onChange}
                  label={t('Sequencial key')}
                  placeholder={t('(e.g.: Generated automatically)')}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}></FormControl>
          <Typography variant='h6' sx={{ ml: 1 }}>
            {t('Schedule routines')}
          </Typography>
          <FormControl fullWidth sx={{ mb: 6, mt: 6 }}>
            <Controller
              name='horaExecucao'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  type='time'
                  value={value}
                  onChange={onChange}
                  label={t("Scheduling time")}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='periodicidade'
              control={control}
              render={({ field: { value, onChange } }) => {
                return (
                  <Autocomplete
                    multiple={false}
                    options={periodicidades}
                    filterSelectedOptions
                    value={value}
                    id='autocomplete-multiple-outlined'
                    getOptionLabel={option => option}
                    onChange={(event, newValue) => {
                      onChange(newValue)
                    }}
                    renderInput={params => (
                      <TextField {...params} label={t('Frequency')} placeholder='(e.g.: Diariamente)' />
                    )}
                  />
                )
              }}
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              {t('Save')}
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              {t('Cancel')}
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

// ** Controle de acesso da página
// ** Usuário deve possuir a habilidade para ter acesso a esta página
RotinaEditDrawer.acl = {
  action: 'update',
  subject: 'ac-rotina-page'
}

export default RotinaEditDrawer
