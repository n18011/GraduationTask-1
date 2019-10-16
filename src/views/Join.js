import React from 'react'

import {
  Grid,
  Typography
} from '@material-ui/core'

import EventsCard from '../components/EventsCard' // propsにプレイヤーが過去に参加した大会データを入力

export default () => {
  return (
    <>
      <Grid container justify='center' alignItems='center' >
        <Grid container direction='column' spacing={4} md={10}>
          <Grid item>
            <Typography variant='h4'>参加した大会</Typography>
          </Grid>

          <Grid item>
            <EventsCard />
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
