import { useContext   } from 'react';

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip';

// ** Third Party Imports
import { useTranslation } from 'react-i18next'

// ** Import Toast
import 'react-toastify/dist/ReactToastify.css';

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
          placeholder={t("Search Client")}
          onChange={e => handleFilter(e.target.value)}
        />
        {ability?.can('create', 'ac-cliente-page') ? (
          <Tooltip title={"Adicionar novo cliente"}>
            <Button sx={{ mb: 2, ml: 2 }} onClick={toggle} variant='contained'>
              + {t("Add Client")}
            </Button>
          </Tooltip>
        ) : <></>}
      </Box>
    </Box>
  )
}

export default TableHeader
