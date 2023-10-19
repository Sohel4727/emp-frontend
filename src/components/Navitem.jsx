import { Button, Grid } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Navitem = ({item}) => {
  return (
    <Grid item xs={item.xs}>
        <Link to={item.path}>
            <Button variant="contained" fullWidth color="warning">{item.title}</Button>
        </Link>
    </Grid>
  )
}

export default Navitem