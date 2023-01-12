// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import TableContainer from '@mui/material/TableContainer'
import TableCell, { TableCellBaseProps } from '@mui/material/TableCell'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Actions Imports
import relatorioComercialApiService from 'src/@api-center/relatorios/comercial/relatorioComercialApiService'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** Type imports
import { VendedorComissaoType } from 'src/types/negocios/comercial/vendedor/comissao/vendedorComissaoTypes'
import { useEffect, useState } from 'react'

// ** Axios Imports
import axios from 'axios'

// ** Date Components Imports
import moment from "moment";
import { toast } from 'react-toastify'

interface RelatorioComissaoVendedorType {
  id: string
  dataInicio: Date | number | null
  dataFim: Date | number | null 
}

const MUITableCell = styled(TableCell)<TableCellBaseProps>(({ theme }) => ({
  borderBottom: 0,
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  paddingTop: `${theme.spacing(1)} !important`,
  paddingBottom: `${theme.spacing(1)} !important`
}))

const CalcWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:not(:last-of-type)': {
    marginBottom: theme.spacing(2)
  }
}))

const formatCurrency = (currency: number | null | undefined) => {
  return currency?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

const calcularTotal = (data: VendedorComissaoType[] | undefined) => {
  const initialValue = 0;
  const sum = data?.reduce(
    (accumulator, currentValue) => 
      {
        if (currentValue.valorComissao != null)
        {
          return accumulator + currentValue.valorComissao
        } else {
          return 0;
        }
        
      }, initialValue
  );
    
  return sum;
}

const RelatorioComissaoVendedor = ({ id, dataInicio, dataFim }: RelatorioComissaoVendedorType) => {
  // ** Hook
  const theme = useTheme()
  const { t } = useTranslation()
  const [data, setData] = useState<VendedorComissaoType[]>()

  const inicioData = dataInicio?.toString().slice(0, 16)
  const fimData = dataFim?.toString().slice(0, 16)

  const dataInicioChecked = isNaN(dataInicio as any) ? null : moment(dataInicio!).format("YYYY-MM-DD")
  const dataFimChecked = isNaN(dataFim as any) ? null : moment(new Date(dataFim!)).format("YYYY-MM-DD")

  const storageToken = window.localStorage.getItem(relatorioComercialApiService.storageTokenKeyName)
  const config = {
    headers: {
      Authorization: `Bearer ${storageToken}`
    }
  }

  useEffect(() => {
    axios
      .post(
        `${relatorioComercialApiService.listComissoesAsyns}/${id}`,
        { dataInicio: dataInicioChecked, dataFim: dataFimChecked },
        config
      )
      .then(response => {
        setData(response.data.allData)
      })
      .catch(error => {
        toast.error(error.message)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Card>
      <CardContent>
        <Grid container>
          <Grid item sm={6} xs={12} sx={{ mb: { sm: 0, xs: 4 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ mb: 6, display: 'flex', alignItems: 'center' }}>
                <svg
                  width={30}
                  height={25}
                  version='1.1'
                  viewBox='0 0 30 23'
                  xmlns='http://www.w3.org/2000/svg'
                  xmlnsXlink='http://www.w3.org/1999/xlink'
                >
                  <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                    <g id='Artboard' transform='translate(-95.000000, -51.000000)'>
                      <g id='logo' transform='translate(95.000000, 50.000000)'>
                        <path
                          id='Combined-Shape'
                          fill={theme.palette.primary.main}
                          d='M30,21.3918362 C30,21.7535219 29.9019196,22.1084381 29.7162004,22.4188007 C29.1490236,23.366632 27.9208668,23.6752135 26.9730355,23.1080366 L26.9730355,23.1080366 L23.714971,21.1584295 C23.1114106,20.7972624 22.7419355,20.1455972 22.7419355,19.4422291 L22.7419355,19.4422291 L22.741,12.7425689 L15,17.1774194 L7.258,12.7425689 L7.25806452,19.4422291 C7.25806452,20.1455972 6.88858935,20.7972624 6.28502902,21.1584295 L3.0269645,23.1080366 C2.07913318,23.6752135 0.850976404,23.366632 0.283799571,22.4188007 C0.0980803893,22.1084381 2.0190442e-15,21.7535219 0,21.3918362 L0,3.58469444 L0.00548573643,3.43543209 L0.00548573643,3.43543209 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 L15,9.19354839 L26.9548759,1.86636639 C27.2693965,1.67359571 27.6311047,1.5715689 28,1.5715689 C29.1045695,1.5715689 30,2.4669994 30,3.5715689 L30,3.5715689 Z'
                        />
                        <polygon
                          id='Rectangle'
                          opacity='0.077704'
                          fill={theme.palette.common.black}
                          points='0 8.58870968 7.25806452 12.7505183 7.25806452 16.8305646'
                        />
                        <polygon
                          id='Rectangle'
                          opacity='0.077704'
                          fill={theme.palette.common.black}
                          points='0 8.58870968 7.25806452 12.6445567 7.25806452 15.1370162'
                        />
                        <polygon
                          id='Rectangle'
                          opacity='0.077704'
                          fill={theme.palette.common.black}
                          points='22.7419355 8.58870968 30 12.7417372 30 16.9537453'
                          transform='translate(26.370968, 12.771227) scale(-1, 1) translate(-26.370968, -12.771227) '
                        />
                        <polygon
                          id='Rectangle'
                          opacity='0.077704'
                          fill={theme.palette.common.black}
                          points='22.7419355 8.58870968 30 12.6409734 30 15.2601969'
                          transform='translate(26.370968, 11.924453) scale(-1, 1) translate(-26.370968, -11.924453) '
                        />
                        <path
                          id='Rectangle'
                          fillOpacity='0.15'
                          fill={theme.palette.common.white}
                          d='M3.04512412,1.86636639 L15,9.19354839 L15,9.19354839 L15,17.1774194 L0,8.58649679 L0,3.5715689 C3.0881846e-16,2.4669994 0.8954305,1.5715689 2,1.5715689 C2.36889529,1.5715689 2.73060353,1.67359571 3.04512412,1.86636639 Z'
                        />
                        <path
                          id='Rectangle'
                          fillOpacity='0.35'
                          fill={theme.palette.common.white}
                          transform='translate(22.500000, 8.588710) scale(-1, 1) translate(-22.500000, -8.588710) '
                          d='M18.0451241,1.86636639 L30,9.19354839 L30,9.19354839 L30,17.1774194 L15,8.58649679 L15,3.5715689 C15,2.4669994 15.8954305,1.5715689 17,1.5715689 C17.3688953,1.5715689 17.7306035,1.67359571 18.0451241,1.86636639 Z'
                        />
                      </g>
                    </g>
                  </g>
                </svg>
                <Typography
                  variant='h6'
                  sx={{ ml: 2.5, fontWeight: 600, lineHeight: 'normal', textTransform: 'uppercase' }}
                >
                  {themeConfig.templateName}
                </Typography>
              </Box>
              <div>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  Rua Lauro Muller, 52 - Salas 201-202-203
                </Typography>
                <Typography variant='body2' sx={{ mb: 1 }}>
                  Centro, Criciúma - SC, 88801-430
                </Typography>
                <Typography variant='body2'>(48) 3045-1888</Typography>
              </div>
            </Box>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' } }}>
              {}
              <Table sx={{ maxWidth: '400px' }}>
                <TableBody>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='h6'>Relatório de Comissão</Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Data início:</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='body2' sx={{ fontWeight: 600 }}>
                        {inicioData}
                      </Typography>
                    </MUITableCell>
                  </TableRow>
                  <TableRow>
                    <MUITableCell>
                      <Typography variant='body2'>Data fim:</Typography>
                    </MUITableCell>
                    <MUITableCell>
                      <Typography variant='body2' sx={{ fontWeight: 600 }}>
                        {fimData}
                      </Typography>
                    </MUITableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t('Client name')}</TableCell>
              <TableCell align='center'>{t('Contract value')}</TableCell>
              <TableCell align='center'>{t('Commission amount')}</TableCell>
            </TableRow>
          </TableHead>
          {
            data?.map((x, i) => {
              return (
                <TableBody key={i}>
                  <TableRow>
                    <TableCell>{x?.clienteContratoViewModel?.cliente?.nomeFantasia}</TableCell>
                    <TableCell align='center'>{formatCurrency(x?.clienteContratoViewModel?.valorContrato)}</TableCell>
                    <TableCell align='center'>{formatCurrency(x?.valorComissao)}</TableCell>
                  </TableRow>
                </TableBody>
              )
            })
          }
        </Table>
      </TableContainer>

      <CardContent>
        <Grid container>
          <Grid item xs={12} sm={5} lg={9} sx={{ order: { sm: 1, xs: 2 } }}>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant='body2' sx={{ mr: 2, fontWeight: 600 }}>
                {t('Salesperson')}:
              </Typography>
              <Typography variant='body2'>{data?.map(x => x.vendedorViewModel?.nome)[0]}</Typography>
            </Box>
            <Typography variant='body2'>{t('Thanks for your business')}</Typography>
          </Grid>
          <Grid item xs={12} sm={7} lg={3} sx={{ order: { sm: 2, xs: 1 } }}>
            <CalcWrapper>
              <Typography variant='h6'>Total:</Typography>
              <Typography variant='body2' sx={{ fontWeight: 600, mr: 20 }}>
                {formatCurrency(calcularTotal(data))}
              </Typography>
            </CalcWrapper>
          </Grid>
        </Grid>
      </CardContent>

      <Divider />

      {/* <CardContent>
        <Typography variant='body2'>
          <strong>Relatório de comissão:</strong>{' '}
          {t(
            'It was a pleasure working with you and your team. We hope you will keep us in mind for future projects. Thank You!'
          )}
        </Typography>
      </CardContent> */}
    </Card>
  )
}

export default RelatorioComissaoVendedor
