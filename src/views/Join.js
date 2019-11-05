import React, { useState, useMemo } from 'react'
import { db } from '../Firebase'

import {
  Grid,
  Typography
} from '@material-ui/core'

import EventsCard from '../components/EventsCard' // propsにプレイヤーが過去に参加した大会データを入力

export default ({ match }) => {
  const PID = match.params.pid
  const [joinStatus, setJoinStatus] = useState()

  useMemo(() => {
    db.collection('events').where('joineventstatus', '==', true).onSnapshot(query => {
      const data = []
      query.forEach(doc => data.push({ ...doc.data()}))
      setJoinStatus(data)
    })
  }, [])

  return (
    <>
      <Grid container justify='center' alignItems='center' >
        <Grid container direction='column' spacing={4} md={10}>
          <Grid item>
            <Typography variant='h4'>参加した大会</Typography>
          </Grid>

          <Grid item>
            <EventsCard cards={joinStatus}/>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
