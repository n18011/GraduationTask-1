import React from 'react'

import {
  Grid,
  Link,
  Typography
} from '@material-ui/core'

import EventsCard from '../components/EventsCard' // propsで開催状況データを入力

export default () => {
  return (
    <>
      <Grid container alignItems='center' justify='center'>
        <Grid container direction='column' spacing={3} md={10}>
          <Grid item >
            <Typography variant='h4'>
        開催中大会
            </Typography>
          </Grid>
          <Grid item>
            <EventsCard />
          </Grid>
          <Grid item>
            <Typography variant='h4'>
      申し込み中の大会
            </Typography>
          </Grid>
          <Grid item>
            <EventsCard />
          </Grid>
          <Grid item>
            <Typography variant='h4'>
              <Link href='/player/:pid/join' color='inherit'>個人成績</Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h4'>
              <Link href='/held' color='inherit'>開催済み大会</Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='h4'>
              <Link href='/nothold' color='inherit'>大会参加申し込み</Link>
            </Typography>
          </Grid>
        </Grid></Grid>
    </>
  )
}
