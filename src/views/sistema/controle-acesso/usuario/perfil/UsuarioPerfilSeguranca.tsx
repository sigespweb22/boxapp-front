// ** React Imports
import { ReactNode } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TableContainer from '@mui/material/TableContainer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'

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
