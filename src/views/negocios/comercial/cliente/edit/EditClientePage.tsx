// ** React Imports
import { useState, useEffect } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Alert from '@mui/material/Alert'
import Typography from '@mui/material/Typography'

// ** Third Party Components
import axios from 'axios'
import { id } from 'date-fns/locale'

// ** Types

const UserClientePage = (id: string) => {
    return (
        <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
            <Typography variant='h6'>`Editar cliente ${id.id}`</Typography>
        </Grid>
        </Grid>
    )
}

export default UserClientePage