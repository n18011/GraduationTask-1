import React, { useMemo, useState } from 'react'
import { db } from '../Firebase'

import {
  Grid,
  Link,
  Fab,
  Typography
} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import EventsCard from '../components/EventsCard' // propsで開催状況データを入力
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  fab: {
    color: 'white',
    backgroundColor: '#77bbdd',
    '&:hover': {
      backgroundColor: '#77bb88'
    }
  },
  div: {
    position: 'fixed',
    [theme.breakpoints.up('md')]: {
      bottom: '50%',
      right: theme.spacing(8),
    }
  },
}))

export default ({ match }) => {
  const classes = useStyles()
  const PID = match.params.pid
  const notholdPath = `/player/${PID}/nothold`
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
    db.collection('users').doc(PID).get().then(
      function (doc) {
        const evarray = Object.keys(doc.data().join)
        evcounter.push(evarray.length)
        for (var i = 0; evarray.length > i; i++) {
          db.collection('events').doc(evarray[i]).get().then(
            function (evdoc) {
              const pushObj = { ...evdoc.data(), id: evdoc.id }
              evJoin.push(pushObj)
              if (evJoin.length === evcounter[0]) {
                setEvjoin(evJoin)
              }
            }
          )
        }
      }
    )
  }, [])
  return (
    <>
      <Grid container direction='column' spacing={3} item md={10}>
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
          <EventsCard cards={eventjoin} />
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
            <Link href={notholdPath} color='inherit'>大会参加申し込み</Link>
          </Typography>
        </Grid>
      </Grid>

      <div className={classes.div} role='presentation' >
        <Fab className={classes.fab} href={notholdPath}>
          <PersonAddIcon />
        </Fab>
      </div>
    </>
  )
}
