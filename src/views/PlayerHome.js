import React, { useMemo, useState } from 'react'
import { db } from '../Firebase'

import {
  Grid,
  Link,
  Typography
} from '@material-ui/core'

import EventsCard from '../components/EventsCard' // propsで開催状況データを入力

export default () => {
  const [nowevents, setNevents] = useState([])
  const [eventjoin, setEvjoin] = useState([])

  useMemo(() => {
    db.collection('events').where('status.nowhold', '==', true).onSnapshot(query => {
      const data = []
      query.forEach(doc => data.push({ ...doc.data(), id: doc.id }))
      setNevents(data)
    })
  }, [])

  useMemo(() => {
    const evJoin = []
    const evcounter = []
    db.collection('users').doc('U001').get().then(
      function(doc) {
        const evarray = Object.keys(doc.data().join)
        evcounter.push(evarray.length)
        for (var i = 0; evarray.length > i; i++) {
          db.collection('events').doc(evarray[i]).get().then(
            function (evdoc) {
              const pushObj = { ...evdoc.data(), id: evdoc.id}
              evJoin.push(pushObj)
              if (evJoin.length === evcounter[0]) {
                setEvjoin(evJoin)}
            }
          )}
      }
    )
  }, [])
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
            <EventsCard cards={nowevents} />
          </Grid>
          <Grid item>
            <Typography variant='h4'>
      申し込み中の大会
            </Typography>
          </Grid>
          <Grid item>
            <EventsCard cards={eventjoin}/>
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
