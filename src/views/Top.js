import React, { useState, useMemo } from 'react'
import { db } from '../Firebase'
import EventsCard from '../components/EventsCard'

import {
  Grid,
  Typography,
  Link
} from '@material-ui/core'

export default () => {
  const [nowEvents, setNowEvents] = useState([])

  useMemo(() => {
    const col = db.collection('events')

    col.where('status.nowhold', '==', true).onSnapshot(query => {
      const data = []
      query.forEach(doc => data.push({ ...doc.data(), id: doc.id }))
      setNowEvents(data)
    })
    return col
  }, [])

  return (
      <>
        <Grid container direction='column' spacing={3} item md={10}>

          <Grid item xs>
            <Typography variant='h4'>開催中大会</Typography>
          </Grid>

          <Grid item xs>
            <EventsCard cards={nowEvents} />
          </Grid>

          <Grid item xs>
            <Typography variant='h4'>
              <Link href='/held' color='inherit'>過去の大会一覧</Link>
            </Typography>
          </Grid>
        </Grid>
    </>
  )
}
