import React, { useState, useMemo } from 'react'
import { db } from '../Firebase'

import {
  Grid,
  Typography
} from '@material-ui/core'

import EventsCard from '../components/EventsCard' // propsにプレイヤーが過去に参加した大会データを入力

export default ({ match }) => {
  const [pushId, setPushId] = useState([])
  const PID = match.params.pid

  useMemo(() => {
    const evinfo = []
    const evcounter = []
    db.collection('users').doc(PID).get().then(
      function(doc) {
        const evarray = Object.keys(doc.data().join)
        evcounter.push(evarray.length)
        for(var i = 0; evarray.length > i; i++) {
          db.collection('events').doc(evarray[i]).get().then(
            function(evdoc) {
              const pushObj = {...evdoc.data(), id: evdoc.id}
              evinfo.push(pushObj)
              if (evinfo.length === evcounter[0]){
                setPushId(evinfo)
              }
            }
          )
        }
      }
    )
  }, [PID])

  return (
    <>
      <Grid container justify='center' alignItems='center' >
        <Grid container direction='column' spacing={4} md={10}>
          <Grid item>
            <Typography variant='h4'>参加した大会</Typography>
          </Grid>

          <Grid item>
            <EventsCard cards={pushId}/>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
