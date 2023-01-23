import { useContext   } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip';

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Hooks
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
          placeholder={t("Search routine")}
          onChange={e => handleFilter(e.target.value)}
        />
        {ability?.can('create', 'ac-rotina-page') ? (
          <Tooltip title={t("Add a schedule for updating routines")}>
            <Button sx={{ mb: 2, ml: 2 }} onClick={toggle} variant='contained'>
              + {t("Add schedule")}
            </Button>
          </Tooltip>
        ) : <></>}
      </Box>
    </Box>
  )
}

export default TableHeader
