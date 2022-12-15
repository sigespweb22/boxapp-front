// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Demo Components
import ChangePasswordCard from 'src/views/sistema/controle-acesso/usuario/perfil/seguranca/ChangePasswordCard'

interface Props {
  id: string | undefined
}

const UsuarioPerfilSeguranca = (props: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ChangePasswordCard id={props.id}/>
      </Grid>
    </Grid>
  )
}

UsuarioPerfilSeguranca.acl = {
  action: 'update',
  subject: 'ac-user-page'
}


export default UsuarioPerfilSeguranca