import React, { useMemo, useState } from 'react'
import { db } from '../Firebase'

import {
  Grid,
  Link,
  Typography
} from '@material-ui/core'

import EventsCard from '../components/EventsCard' // propsに開催中のデータ入力
import EventsListWill from '../components/EventsListWill' // propsに開催予定のデータ入力

export default () => {
  const [nowevents, setNevents] = useState([])
  const [willevents, setWevents] = useState([])

  useMemo(() => {
    const col = db.collection('events')

    col.where('status.nowhold', '==', true).onSnapshot(query => {
      const data = []
      query.forEach(doc => data.push({ ...doc.data(), id: doc.id }))
      console.log(data)
      setNevents(data)
    })
  }, [])

  useMemo(() => {
    const evinfo = []
    db.collection('users').doc('U001').get().then(
      function(doc) {
        const evarray = Object.keys(doc.data().holdplans)
        for (var i = 0; evarray.length > i; i++) {
          db.collection('events').doc(evarray[i]).get().then(
            function(evdoc) {
              const pushObj = {...evdoc.data(), id: evdoc.id}
              evinfo.push(pushObj)
              console.log(evinfo)
              setWevents(evinfo)
            }
          )
        }
      }
    )
  }, [])


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
            <EventsCard cards={nowevents} />
          </Grid>

          <Grid item>
            <Typography variant='h4'>
              大会開催予定一覧
            </Typography>
          </Grid>
          <Grid item>
            <EventsListWill cards={willevents} />
          </Grid>

        </Grid>

      </Grid>
    </>
  )
}
