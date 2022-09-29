// ** React Imports
import React from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

import PipelineKanBan from 'src/@core/components/pipelines/index'

interface Propstype {
  id: string | string[] | undefined
}

const PipelineManagerPage = ({id}: Propstype) => {
  return (
      <Grid container spacing={6} className='match-height'>
        <PageHeader
          title={<Typography variant='h5'>Pré-venda</Typography>}
          subtitle={
            <Typography variant='body2'>
              Nesta etapa ocorre a qualificação dos leads {id}
            </Typography>
          }
        />
        <Grid item xs={12} sm={12} lg={12}>
          <PipelineKanBan />
        </Grid>
      </Grid>
  )
}

export default PipelineManagerPage