// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useContext } from 'react'

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Hook
  const { t } = useTranslation()
  const ability = useContext(AbilityContext)

  // ** Props
  const { handleFilter, toggle, value } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <TextField
          size='small'
          value={value}
          sx={{ mr: 4, mb: 2 }}
          placeholder={t("Search User")}
          onChange={e => handleFilter(e.target.value)}
        />
        {ability?.can('create', 'ac-user-page') ? (
          <Button sx={{ mb: 2 }} onClick={toggle} variant='contained'>
            + {t("Add User")}
          </Button>
        ) : <></>}
      </Box>
    </Box>
  )
}

export default TableHeader
