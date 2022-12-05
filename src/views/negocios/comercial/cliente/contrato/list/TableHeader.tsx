// ** MUI Imports
import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'

// interface TableHeaderProps {
//   toggle: () => void
// }

// const TableHeader = (props: TableHeaderProps) => {
const TableHeader = () => {
  // ** Props
  // const { toggle } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* <Button sx={{ mb: 2 }} onClick={toggle} variant='contained'>
          + Novo
        </Button> */}
      </Box>
    </Box>
  )
}

export default TableHeader