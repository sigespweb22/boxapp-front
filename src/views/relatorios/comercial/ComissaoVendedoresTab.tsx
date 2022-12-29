// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** Third Party Import
import { useTranslation } from 'react-i18next'

// ** MUI Imports
import Div from '@mui/material/Grid'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  CardContent,
  TextField
} from '@mui/material'
import { GridExpandMoreIcon } from '@mui/x-data-grid'

// ** Api Services
import vendedorApiService from 'src/@api-center/negocios/comercial/vendedor/vendedorApiService'

// ** Types Imports
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Context Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

interface Vendedor {
  vendedorId: string
  nome: string
}
interface CustomInputProps {
  dates: Date[]
  label: string
  end: number | Date
  start: number | Date
  setDates?: (value: Date[]) => void
}

const CustomInput = forwardRef((props: CustomInputProps, ref) => {
  const startDate = props.start !== null ? format(props.start, 'MM/dd/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'MM/dd/yyyy')}` : null

  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates

  return <TextField fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})

const defaultValues = {
  vendedor: { vendedorId: '', nome: '' }
}

const ComissaoVendedor = () => {
  const { t } = useTranslation()
  const [dates, setDates] = useState<Date[]>([])
  const [endDateRange, setEndDateRange] = useState<DateType>(null)
  const [startDateRange, setStartDateRange] = useState<DateType>(null)
  const [vendedores, setVendedores] = useState<Vendedor[]>([])
  const { control } = useForm({
    defaultValues: defaultValues,
    mode: 'onChange'
  })

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(vendedorApiService.storageTokenKeyName)}`
    }
  }

  useEffect(() => {
    axios.get(`${vendedorApiService.listToSelectAsync}`, config).then(response => {
      setVendedores(response.data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleOnChangeRange = (dates: any) => {
    const [start, end] = dates
    if (start !== null && end !== null) {
      setDates(dates)
    }
    setStartDateRange(start)
    setEndDateRange(end)
  }

  return (
    <DatePickerWrapper>
      <Grid>
        <Accordion>
          <AccordionSummary expandIcon={<GridExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
            <Typography>{t('Seller commission')}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name='vendedor'
                    control={control}
                    render={({ field: { value, onChange } }) => {
                      return (
                        <Autocomplete
                          multiple={false}
                          options={vendedores || []}
                          filterSelectedOptions
                          value={value}
                          id='autocomplete-multiple-outlined'
                          getOptionLabel={option => option.nome}
                          renderInput={params => (
                            <TextField {...params} label={t('Seller')} placeholder='(e.g.: Jhon Dare)' />
                          )}
                          onChange={(event, newValue) => {
                            onChange(newValue)
                          }}
                        />
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DatePicker
                    isClearable
                    selectsRange
                    monthsShown={2}
                    endDate={endDateRange}
                    selected={startDateRange}
                    startDate={startDateRange}
                    shouldCloseOnSelect={true}
                    id='date-range-picker-months'
                    onChange={handleOnChangeRange}
                    customInput={
                      <CustomInput
                        dates={dates}
                        setDates={setDates}
                        label={t('Invoice Date')}
                        end={endDateRange as number | Date}
                        start={startDateRange as number | Date}
                      />
                    }
                  />
                </Grid>
              </Grid>
              <Div sx={{ mb: 2, mt: 8 }}>{t("When omitting any information, all data will be returned.")}</Div>
            <Button sx={{ mt: 3 }} variant='contained'>
              {t('GENERATE')}
            </Button>
            </CardContent>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </DatePickerWrapper>
  )
}

export default ComissaoVendedor
