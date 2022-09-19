// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import PipelineCards from 'src/views/bussiness/processos/pipelines/list/PipelineCards'

const PipelinesComponent = () => {
  return (
    <Grid container spacing={6}>
      <PageHeader
        title={<Typography variant='h5'>Pipelines</Typography>}
        subtitle={
          <Typography variant='body2'>
            Um pipeline é um quadro de etapas que pode ou não representar um processo ou denotar o início e fim de uma atividade específica.
          </Typography>
        }
      />
      <Grid item xs={12} sx={{ mb: 4 }}>
        <PipelineCards />
      </Grid>
    </Grid>
  )
}

export default PipelinesComponent
