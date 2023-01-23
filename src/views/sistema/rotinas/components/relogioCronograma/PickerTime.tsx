// ** React Imports
import { useState } from 'react'

// ** Third Party Imports
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Custom Component Imports
import CustomInput from './PickersCustomInput'

const PickerTime = ({ popperPlacement }: { popperPlacement: ReactDatePickerProps['popperPlacement'] }) => {
  // ** States
  const [time, setTime] = useState<DateType>(new Date())

  return (
    <DatePicker
      showTimeSelect
      selected={time}
      timeIntervals={15}
      showTimeSelectOnly
      dateFormat='h:mm aa'
      id='time-only-picker'
      popperPlacement={popperPlacement}
      onChange={(date: Date) => setTime(date)}
      customInput={<CustomInput label='Hórario agendamento' />}
    />
  )
}

export default PickerTime
