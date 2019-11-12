import React, { useMemo, useState } from 'react'
import { db } from '../Firebase'

import {
  Grid,
  Fab,
  Button,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CreateIcon from '@material-ui/icons/Create';

import EventsCard from '../components/EventsCard' // propsに開催中のデータ入力
import EventsListWill from '../components/EventsListWill' // propsに開催予定のデータ入力

const useStyles = makeStyles(theme => ({
  button: {
    color: 'white',
    backgroundColor: '#77bbdd',
    '&:hover': {
      backgroundColor: '#77bb88'
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: '65%',
    }
  },
  div: {
    position: 'fixed',
    right: '45%',
    bottom: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      bottom: '10%',
      right: theme.spacing(8),
    }
  },
  fab: {
    color: 'white',
    backgroundColor: '#77bbdd',
    '&:hover': {
      backgroundColor: '#77bb88'
    }
  },
}))

export default ({ match }) => {
  const AID = match.params.aid
  const inputPath = `/admin/${AID}/input`
  const classes = useStyles()
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
    const evinfo = []
    const evcounter = []
    db.collection('users').doc(AID).get().then(
      function (doc) {
        const evarray = Object.keys(doc.data().holdplans)
        evcounter.push(evarray.length)
        for (var i = 0; evarray.length > i; i++) {
          db.collection('events').doc(evarray[i]).get().then(
            function (evdoc) {
              const pushObj = { ...evdoc.data(), id: evdoc.id }
              evinfo.push(pushObj)
              if (evinfo.length === evcounter[0]) {
                setWevents(evinfo)
              }
            }
          )
        }
      }
    )
  }, [])

  return (
    <>
      <Grid item container direction='column' spacing={3} md={10}>


        <Grid item xs>
          <Typography variant='h4'>
            開催中大会
          </Typography>
        </Grid>

        <Grid item xs>
          <EventsCard
            cards={nowevents}
            pid={AID}
            button
          />
        </Grid>

        <Grid item container spacing={2} justify='center' xs>

          <Grid item md={6} xs={12}>
            <Typography variant='h4'>
              大会開催予定一覧
          </Typography>
          </Grid>

          <Grid item md={6} xs={12}>
            <Button
              className={classes.button}
              variant='contained'
              href={inputPath}
            >
              大会開催申請
          </Button>
          </Grid>

        </Grid>

        <Grid item xs>
          <EventsListWill
            pid={AID}
            cards={willevents}
            button
          />
        </Grid>

      </Grid>

      <div className={classes.div} role='presentation' >
        <Fab className={classes.fab} href={inputPath}>
          <CreateIcon />
        </Fab>
      </div>

    </>
  )
}
