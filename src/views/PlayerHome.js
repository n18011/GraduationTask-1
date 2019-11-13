import React, { useMemo, useState } from 'react'
import { db } from '../Firebase'

import {
  Grid,
  Link,
  Fab,
  Typography
} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import HistoryIcon from '@material-ui/icons/History';

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
  join: {
    position: 'fixed',
      bottom: '3%',
      right: '45%',
    [theme.breakpoints.up('md')]: {
      bottom: '50%',
      right: theme.spacing(8),
    }
  },
  playerHistory: {
    position: 'fixed',
      bottom: '2%',
      right: '65%',
    [theme.breakpoints.up('md')]: {
      bottom: '40%',
      right: theme.spacing(9),
    }
  },
  eventsHistory: {
    position: 'fixed',
      bottom: '2%',
      right: '30%',
    [theme.breakpoints.up('md')]: {
      bottom: '30%',
      right: theme.spacing(9),
    }
  },
}))

export default ({ match }) => {
  const classes = useStyles()
  const PID = match.params.pid
  const Path = `/player/${PID}`
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
      </Grid>

      <div className={classes.join} role='presentation' >
        <Fab className={classes.fab} href={Path + '/nothold'}>
          <PersonAddIcon />
        </Fab>
      </div>

      <div className={classes.playerHistory} role='presentation' >
        <Fab className={classes.fab} size='small' href={Path + '/join'}>
          <FolderSharedIcon></FolderSharedIcon>
        </Fab>
      </div>

      <div className={classes.eventsHistory} role='presentation' >
        <Fab className={classes.fab} size='small' href='/held'>
          <HistoryIcon></HistoryIcon>
        </Fab>
      </div>
    </>
  )
}
