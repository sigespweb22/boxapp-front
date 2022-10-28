// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Hook
  const { t } = useTranslation()

  // ** Props
  const { toggle } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button sx={{ mb: 2 }} onClick={toggle} variant='contained'>
          + Novo
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader