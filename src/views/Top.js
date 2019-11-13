import React, { useState, useMemo } from 'react'
import { db } from '../Firebase'
import EventsCard from '../components/EventsCard'

import {
  Grid,
  Typography,
  Link
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  linktext: {
    marginTop: '20px'
  }
}))

export default () => {
  const classes = useStyles()
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

          <Grid item container xs>
            <Grid item md={6} xs>
            <Typography variant='h4'>開催中大会</Typography>
</Grid>
          <Grid item md={6} xs>
            <Typography className={classes.linktext} variant='h6' align='right'>
              <Link href='/held' color='inherit'>過去の大会一覧へ>></Link>
            </Typography>
          </Grid>
          </Grid>


          <Grid item xs>
            <EventsCard cards={nowEvents} />
          </Grid>

        </Grid>
    </>
  )
}
