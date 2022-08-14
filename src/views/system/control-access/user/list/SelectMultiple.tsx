// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// Import Translate
import { useTranslation } from 'react-i18next'

// ** Api Services
import apiGroup from 'src/@api-center/group/groupApi'

// ** Axios Imports
import axios from 'axios'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
}

const names = [
  { id: "1", name: "admin" },
  { id: "2", name: "suporte" },
  { id: "3", name: "teste" }
]

const SelectMultiple = () => {
  // ** Statepassword
  const [personName, setPersonName] = useState<string[]>([])

  // ** Hook
  const { t } = useTranslation()

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setPersonName(event.target.value as string[])
  }

  const storedToken = window.localStorage.getItem(apiGroup.storageTokenKeyName)!
  const response = axios
                      .get(apiGroup.listToSelectAsync, {
                            headers: {
                              Authorization: "Bearer " + storedToken
                            }
                      }).then((response) => {
                        // names = response.data.groups
                      })

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', '& > *': { mt: 4, maxWidth: 500 } }}>
      <div>
        <FormControl fullWidth>
          <InputLabel id='demo-multiple-chip-label'>{t("User Group")}</InputLabel>
          <Select
            multiple
            label="User Group"
            value={personName}
            MenuProps={MenuProps}
            id='demo-multiple-chip'
            onChange={handleChange}
            labelId='demo-multiple-chip-label'
            renderValue={selected => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                {(selected as unknown as string[]).map(value => (
                  <Chip key={value} label={value} sx={{ m: 0.75 }} />
                ))}
              </Box>
            )}
          >
            {
              names.map(item => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
    </Box>
  )
}

export default SelectMultiple
