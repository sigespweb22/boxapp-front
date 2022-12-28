// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import { Button } from '@mui/material'
import MenuDown from 'mdi-material-ui/MenuDown'

// Import Translate
import { useTranslation } from 'react-i18next'


const ComissaoVendedor = () => {
    const { t } = useTranslation()

    return (
    <Card sx={{ position: 'relative', overflow: 'visible', mt: { xs: 0, sm: 7.5, md: 0 } }}>
        <CardContent sx={{ p: theme => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={6}>
            <Grid item xs={12} sm={12}>
            <Grid sx={{display:'flex', justifyContent: 'space-between'}}>
                <Typography variant='h5' sx={{ mb: 0 , mt: 1, ml: 3}}>
                    {t("Seller commission")}
                </Typography>
                <Button><MenuDown /></Button>
            </Grid>
            </Grid>
        </Grid>
        </CardContent>
    </Card>
    )
}

export default ComissaoVendedor
