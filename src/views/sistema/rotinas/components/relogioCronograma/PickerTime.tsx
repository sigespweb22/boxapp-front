// ** React Imports
import { useState } from 'react'

// ** Third Party Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Custom Component Imports
import CustomInput from './PickersCustomInput'

const PickerTime = ({ popperPlacement }: { popperPlacement: ReactDatePickerProps['popperPlacement'] }) => {
  // ** States
  const [time, setTime] = useState<DateType>()
  const { t } = useTranslation()

  return (
    <DatePicker
      showTimeSelect
      selected={time}
      timeIntervals={15}
      showTimeSelectOnly
      dateFormat='HH:mm'
      id='time-only-picker'
      popperPlacement={popperPlacement}
      onChange={(date: Date) => {
        setTime(date)
      }}
      customInput={<CustomInput label={t("Scheduling time")} />}
    />
  )
}

export default PickerTime
