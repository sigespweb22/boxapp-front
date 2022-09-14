// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icons Imports
import Circle from 'mdi-material-ui/Circle'
import AccountGroup from 'mdi-material-ui/AccountGroup'
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import ReactApexcharts from 'src/@core/components/react-apexcharts'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

// ** Translation
import { useTranslation } from 'react-i18next'

const CrmSalesOverview = () => {
  // ** Hook
  const theme = useTheme()
  const { t } = useTranslation()

  const options: ApexOptions = {
    chart: {
      sparkline: { enabled: true }
    },
    colors: [
      theme.palette.primary.main,
      hexToRGBA(theme.palette.primary.main, 0.7),
      hexToRGBA(theme.palette.primary.main, 0.5),
      theme.palette.customColors.bodyBg
    ],
    stroke: { width: 0 },
    legend: { show: false },
    dataLabels: { enabled: false },
    labels: ['Master', 'Suporte N1', 'Suporte N2', 'Financeiro'],
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      pie: {
        customScale: 0.9,
        donut: {
          size: '70%',
          labels: {
            show: true,
            name: {
              offsetY: 25
            },
            value: {
              offsetY: -15,
              formatter: value => `${value}%`
            },
            total: {
              show: true,
              label: 'Usuários',
              formatter: value => `${value.globals.seriesTotals.reduce((total: number, num: number) => total + num)}%`
            }
          }
        }
      }
    }
  }

  return (
    <Card>
      <CardHeader
        title={t('Users Per Group')}
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options' sx={{ color: 'text.secondary' }}>
            <DotsVertical />
          </IconButton>
        }
      />
      <CardContent
        sx={{
          '& .apexcharts-datalabel-label': {
            lineHeight: '1.313rem',
            letterSpacing: '0.25px',
            fontSize: '0.875rem !important',
            fill: `${theme.palette.text.secondary} !important`
          },
          '& .apexcharts-datalabel-value': {
            letterSpacing: 0,
            lineHeight: '2rem',
            fontWeight: '500 !important'
          }
        }}
      >
        <Grid container sx={{ my: [0, 4, 1.625] }}>
          <Grid item xs={12} sm={6} sx={{ mb: [3, 0] }}>
            <ReactApexcharts type='donut' height={220} series={[12, 25, 60, 3]} options={options} />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ my: 'auto' }}>
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' sx={{ mr: 3 }} variant='rounded'>
                <AccountGroup sx={{ color: 'primary.main' }} />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='body2'>{t("Total users")}</Typography>
                <Typography variant='h6'>86</Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 4 }} />
            <Grid container>
              <Grid item xs={6} sx={{ mb: 4 }}>
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                  <Circle sx={{ mr: 1.5, fontSize: '0.75rem', color: 'primary.main' }} />
                  <Typography variant='body2'>Master</Typography>
                </Box>
                <Typography sx={{ fontWeight: 600 }}>12</Typography>
              </Grid>
              <Grid item xs={6} sx={{ mb: 4 }}>
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                  <Circle sx={{ mr: 1.5, fontSize: '0.75rem', color: hexToRGBA(theme.palette.primary.main, 0.7) }} />
                  <Typography variant='body2'>Suporte N1</Typography>
                </Box>
                <Typography sx={{ fontWeight: 600 }}>25</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                  <Circle sx={{ mr: 1.5, fontSize: '0.75rem', color: hexToRGBA(theme.palette.primary.main, 0.5) }} />
                  <Typography variant='body2'>Suporte N2</Typography>
                </Box>
                <Typography sx={{ fontWeight: 600 }}>60</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
                  <Circle sx={{ mr: 1.5, fontSize: '0.75rem', color: theme.palette.customColors.bodyBg }} />
                  <Typography variant='body2'>Financeiro</Typography>
                </Box>
                <Typography sx={{ fontWeight: 600 }}>3</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default CrmSalesOverview
