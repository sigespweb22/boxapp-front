// ** React Imports
import { useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { updateRotina } from 'src/store/sistema/rotina/index'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { RotinaType } from 'src/types/sistema/rotinas/rotinaType'

interface RotinaEditType {
  row: RotinaType | undefined
  open: boolean
  toggle: () => void
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
  status: ''
}

const RotinaEditDrawer = (props: RotinaEditType) => {
  // ** Hook
  const { t } = useTranslation()

  // ** Props
  const { open, toggle } = props

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    reset,
    control,
    setValue,
    handleSubmit
  } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange'
  })

  const onSubmit = (data: RotinaType) => {
    dispatch(updateRotina({...data}))
    toggle()
    reset()
  }

  useEffect(() => {
    if(props?.row){
      setValue('id', props?.row?.id || '')
      setValue('nome', props?.row?.nome || '')
      setValue('descricao', props?.row?.descricao || '')
      setValue('observacao', props?.row?.observacao || '')
      setValue('dataCompetenciaInicio', props?.row?.dataCompetenciaInicio || '')
      setValue('dataCompetenciaFim', props?.row?.dataCompetenciaFim || '')
      setValue('chaveSequencial', props?.row?.chaveSequencial || '')
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const handleClose = () => {
    toggle()
    reset()
  }

  const handleMaskDataCompetenciaInicio = (newValue: any) => {
    if (newValue)
    {
      if (newValue.currentTarget.value.length === 2) {
        setValue('dataCompetenciaInicio', `${newValue.currentTarget.value}/`)
      } else if (newValue.currentTarget.value.length === 5) {
        setValue('dataCompetenciaInicio', `${newValue.currentTarget.value}/`)
      } else {
        setValue('dataCompetenciaInicio', `${newValue.currentTarget.value.substring(0, 10)}`)
      }
    }
  }

  const handleMaskDataCompetenciaFim = (newValue: any) => {
    if (newValue)
    {
      if (newValue.currentTarget.value.length === 2) {
        setValue('dataCompetenciaFim', `${newValue.currentTarget.value}/`)
      } else if (newValue.currentTarget.value.length === 5) {
        setValue('dataCompetenciaFim', `${newValue.currentTarget.value}/`)
      } else {
        setValue('dataCompetenciaFim', `${newValue.currentTarget.value.substring(0, 10)}`)
      }
    }
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
        <Typography variant='h6'>{t("Routine Edit")}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='id'
              control={control}
              render={({ field: { value } }) => (
                <TextField
                  disabled
                  label='Id'
                  value={value}
                />
              )}
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
                  label={t("Name")}
                  placeholder={t("(e.g.: Client synchronization)")}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='dataCompetenciaInicio'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={(newValue) => {
                    onChange(newValue)
                    handleMaskDataCompetenciaInicio(newValue)
                  }}
                  label={t("Start date period")}
                  placeholder={t("(e.g.: Data início período)")}
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='dataCompetenciaFim'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={(newValue) => {
                    onChange(newValue)
                    handleMaskDataCompetenciaFim(newValue)
                  }}
                  label={t("End date period")}
                  placeholder={t("(e.g.: Data fim período)")}
                />
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
                  label={t("Description")}
                  placeholder={t("(e.g.: This routine inserts new customers)")}
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
                  label={t("Note")}
                  placeholder={t("(e.g.: This routine can change important customer base data)")}
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
                  label={t("Sequencial key")}
                  placeholder={t("(e.g.: Generated automatically)")}
                />
              )}
            />
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
              {t("Save")}
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              {t("Cancel")}
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
