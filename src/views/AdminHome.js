<<<<<<< HEAD
import React, {useMemo, useState} from 'react'
import {db} from '../Firebase'
=======
import React, { useMemo, useState } from 'react'
import { db } from '../Firebase'
>>>>>>> cb042c1ae302850752fd74ca7f0a36a25b5e970c

import {
  Grid,
  Link,
  Typography
} from '@material-ui/core'

import EventsCard from '../components/EventsCard' // propsに開催中のデータ入力
import EventsListWill from '../components/EventsListWill' // propsに開催予定のデータ入力

export default () => {
<<<<<<< HEAD
    const [nowevents, setNevents] = useState([])
    const [willevents, setWevents] = useState([])

    useMemo(() => {
        const col = db.collection('events')

        col.where('status.nowhold', '==', true).onSnapshot(query => {
            const data =[]
            query.forEach(doc => data.push({ ...doc.data(), id: doc.id}))
            setNevents(data)
        })
    },[])

    useMemo(() => {
        const col = db.collection('users')
    
        col.doc('U001').get().then(function(doc) {
            const data = []
            const eventsName = Object.keys(doc.data().holdplans)
            for (var i = 0; eventsName.length > i ; i++) {
                const evname = eventsName[i]
                data.push({'id': evname})
            }
            setWevents(data)
        })
    }, [])

    useMemo(() => {
        const test = willevents
        console.log(Object.values(test[0]))
            }, [willevents])

=======
  const [nowevents, setNevents] = useState([])
  const [willevents, setWevents] = useState([])

  useMemo(() => {
    const col = db.collection('events')

    col.where('status.nowhold', '==', true).onSnapshot(query => {
      const data = []
      query.forEach(doc => data.push({ ...doc.data(), id: doc.id }))
      setNevents(data)
    })
  }, [])

  useMemo(() => {
    const col = db.collection('users')

    col.doc('U001').get().then(function (doc) {
      const data = []
      const eventsName = Object.keys(doc.data().holdplans)
      for (var i = 0; eventsName.length > i; i++) {
        const evname = eventsName[i]
        data.push({ 'id': evname })
      }
      setWevents(data)
    })
  }, [])

  useMemo(() => {
    const test = willevents
    console.log(Object.values(test[0]))
  }, [willevents])

>>>>>>> cb042c1ae302850752fd74ca7f0a36a25b5e970c
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
<<<<<<< HEAD
            <EventsCard cards={nowevents}/>
=======
            <EventsCard cards={nowevents} />
>>>>>>> cb042c1ae302850752fd74ca7f0a36a25b5e970c
          </Grid>

          <Grid item>
            <Typography variant='h4'>
              大会開催予定一覧
            </Typography>
          </Grid>
          <Grid item>
<<<<<<< HEAD
            <EventsListWill cards={willevents}/>
=======
            <EventsListWill cards={willevents} />
>>>>>>> cb042c1ae302850752fd74ca7f0a36a25b5e970c
          </Grid>

        </Grid>

      </Grid>
    </>
  )
}
