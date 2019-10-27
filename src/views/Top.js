import React, { useState, useMemo } from 'react'
import { db } from '../Firebase'
import EventsCard from '../components/EventsCard'

import {
  Grid,
  Typography,
  Link
} from '@material-ui/core'

export default () => {
  const [willevents, setWevents] = useState([])
  const [heldevents, setHevents] = useState([])

  useMemo(() => {
    const col = db.collection('events')

    col.where('status.willhold', '==', true).onSnapshot(query => {
      const data = []
      query.forEach(doc => data.push({ ...doc.data(), id: doc.id }))
      setWevents(data)
    })
    return col
  }, [])

  useMemo(() => {
    const col = db.collection('events')

    col.where('status.held', '==', true).onSnapshot(query => {
      const data = []
      query.forEach(doc => data.push({ id: doc.id }))
      setHevents(data)
    })
  }, [])

  return (
      <>
        <Grid container direction='column' spacing={3} md={10}>

          <Grid item xs>
            <Typography variant='h4'>申し込み可能大会</Typography>
          </Grid>

          <Grid item xs>
            <EventsCard cards={willevents} />
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
