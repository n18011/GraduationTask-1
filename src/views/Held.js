import React from 'react'

import {
  Grid,
  Typography
} from '@material-ui/core'

import EventsListWill from '../components/EventsListWill' // propsに開催済み大会のデータ入力

export default () => {
  return (
    <>
      <Grid container justify='center' alignItems='center'>
        <Typography variant='h4'>過去の大会</Typography>
        <EventsListWill />
      </Grid>
    </>
  )
}
