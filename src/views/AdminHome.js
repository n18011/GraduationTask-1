import React from 'react'

import {
  Grid,
  Link,
  Typography
} from '@material-ui/core'

import EventsCard from '../components/EventsCard' // propsに開催中のデータ入力
import EventsListWill from '../components/EventsListWill' // propsに開催予定のデータ入力

export default () => {
  return (
    <>
      <Grid container justify='center' alignItems='center'>
        <Grid container direction='column' spacing={3} md={10}>

          <Grid item>
            <Typography variant='h4'>
              <Link href='/admin/:aid/input' color='inherit'>大会開催申請</Link>
            </Typography>
          </Grid>

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
              大会開催予定一覧
            </Typography>
          </Grid>
          <Grid item>
            <EventsListWill />
          </Grid>

        </Grid>

      </Grid>
    </>
  )
}
