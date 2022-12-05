// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`© ${new Date().getFullYear()}`}
        <Box component='span' sx={{ color: 'error.main' }}>

        </Box>
        {``}
        <Link target='_blank' href='https://mui.com/store/contributors/themeselection/'>

        </Link>
      </Typography>
      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <Link target='_blank' href='https://mui.com/store/license/'>
            {/* Licença */}
          </Link>
          <Link
            target='_blank'
            href='https://demos.themeselection.com/marketplace/materio-mui-react-nextjs-admin-template/documentation'
          >
            {/* Documentação */}
          </Link>
          <Link target='_blank' href='https://www.boxtecnologia.com.br/'>
            Site
          </Link>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent