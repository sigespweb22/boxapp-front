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

// ** InputMask Imports
import InputMask from 'react-input-mask'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Actions Imports
import { updateChaveApi } from 'src/store/sistema/configuracoes/chave-api/index'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { ChaveApiType } from 'src/types/sistema/configuracoes/chave-api/chaveApiTypes'

interface ChaveApiPageEditType {
  row: ChaveApiType | undefined
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
  apiTerceiro: '',
  key: '',
  descricao: '',
  dataValidade: '',
  status: ''
}

const ChaveApiPageEdit = (props: ChaveApiPageEditType) => {
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
    defaultValues,
    mode: 'onChange'
  })

  const onSubmit = (data: ChaveApiType) => {
    dispatch(updateChaveApi({ ...data,  }))
    toggle()
    reset()
  }

  useEffect(() => {

    if(props?.row){
      setValue('id', props?.row?.id || '')
      setValue('apiTerceiro', props?.row?.apiTerceiro || '')
      setValue('key', props?.row?.key || '')
      setValue('descricao', props?.row?.descricao || '')
      setValue('dataValidade', props?.row?.dataValidade || '')
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props])

  const handleClose = () => {
    toggle()
    reset()
    setValue('id', props?.row?.id || '')
    setValue('apiTerceiro', props?.row?.apiTerceiro || '')
    setValue('key', props?.row?.key || '')
    setValue('descricao', props?.row?.descricao || '')
    setValue('dataValidade', props?.row?.dataValidade || '')
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
        <Typography variant='h6'>{t("Api key Edit")}</Typography>
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
                  label='ID'
                  value={value}
                  defaultValue='.'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='apiTerceiro'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  disabled={true}
                  value={value}
                  onChange={onChange}
                  label={t("Third party API")}
                  placeholder='(e.g.: Bom controle)'
                  defaultValue='.'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='key'
              control={control}
              render={({ field: { value, onChange } }) => (
                <TextField
                  value={value}
                  onChange={onChange}
                  label={t("Key")}
                  placeholder='(e.g.: d00d77c7-253a-406f-b8b1-a8a7af23e614'
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
                  placeholder='(e.g.: Esta chave de api oferece permissão para atualizar dados do módulo financeiro'
                />
              )}
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 6 }}>
            <Controller
              name='dataValidade'
              control={control}
              render={({ field: { value, onChange } }) => (
                <InputMask
                  mask="99/99/9999"
                  value={value}
                  disabled={false}
                  onChange={(newValue): void => {
                    onChange(newValue)
                  }}
                >
                  <TextField
                    disabled={false}
                    label={t("Expiration date")}
                    name="dataValidade"
                    type="text"
                    placeholder='(e.g.: 01/04/1985)'
                  />
                </InputMask>
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
ChaveApiPageEdit.acl = {
  action: 'update',
  subject: 'ac-chaveApiTerceiro-page'
}

export default ChaveApiPageEdit