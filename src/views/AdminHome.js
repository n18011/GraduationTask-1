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
<<<<<<< HEAD
      const data =[]
      query.forEach(doc => data.push({ ...doc.data(), id: doc.id}))
      setNevents(data)
    })
  },[])
=======
      const data = []
      query.forEach(doc => data.push({ ...doc.data(), id: doc.id }))
      setNevents(data)
    })
  }, [])
>>>>>>> 595a170e2c10f7cf03eb6a548e71f7a8d0975dfe

  useMemo(() => {
    const col = db.collection('users')

<<<<<<< HEAD
    col.doc('U001').get().then(function(doc) {
      const data = []
      const eventsName = Object.keys(doc.data().holdplans)
      for (var i = 0; eventsName.length > i ; i++) {
        const evname = eventsName[i]
        data.push({'id': evname})
=======
    col.doc('U001').get().then(function (doc) {
      const data = []
      const eventsName = Object.keys(doc.data().holdplans)
      for (var i = 0; eventsName.length > i; i++) {
        const evname = eventsName[i]
        data.push({ 'id': evname })
>>>>>>> 595a170e2c10f7cf03eb6a548e71f7a8d0975dfe
      }
      setWevents(data)
    })
  }, [])

  useMemo(() => {
    const test = willevents
    console.log(Object.values(test[0]))
  }, [willevents])

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
