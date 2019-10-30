import React, { useState, useEffect, useMemo } from 'react'

import {
  Grid,
  Paper,
  Typography,
  TextField
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import request from 'superagent'

import { db } from '../Firebase'

const useStyles = makeStyles(theme => ({
  card: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  textField: {
    marginLeft: theme.spacing(3)
  },
  text: {
    marginTop: theme.spacing(2)
  }
}))
// VS以外の全てのTypography部にデータが入る
export default () => {
  const classes = useStyles()
  const [players, setPlayers] = useState({})
  const [values, setValues] = useState([])
  const [scoreCountP1, setScoreCountP1] = useState(0)
  const [scoreCountP2, setScoreCountP2] = useState(0)

  useMemo(() => {
    const eventCols = db.collection('events').doc('E001')
    const matchCols = eventCols.collection('matchs').doc('M001')
    matchCols.get()
      .then(doc => {
        setPlayers(doc.data().players)
      })
  }, [])

  useMemo(() => {
    request.get('https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/n18011no5/matches/178670632').end((err, res) => {
      const scores = res.body.match.scoresCsv.split(',')
      const data = []
      scores.map(score => {
        const setPoint = score.split('-')
        data.push({ player1: setPoint[0], player2: setPoint[1] })
      })
      setValues(data)
    })
  }, [])

  useEffect(() => {
    var p1point = 0
    var p2point = 0
    values.map(value => {
      if (Number(value.player1) < Number(value.player2)) {
        p2point++
      } else {
        p1point++
      }
    })
    setScoreCountP1(p1point)
    setScoreCountP2(p2point)
  }, [values])

  /*
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  */
  return (
    <>
      <Grid container alignItems='center' justify='center'>

        <Grid item xs container direction='column'>

          <Paper>

            <Grid item xs>
              <Typography variant='h5' align='center' className={classes.text}>
                {players.player1}
              </Typography>
            </Grid>

            <Grid item xs>
              {values.map((product, index) => (
                <>

                  <TextField
                    id='filled-number'
                    label={index + 1}
                    value={product.player1}
                    type='number'
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin='normal'
                  />
                </>
              ))
              }
            </Grid>

            <Grid item xs>
              <Typography variant='h5' align='center' gutterBottom>{scoreCountP1}</Typography>
            </Grid>

          </Paper>
        </Grid>

        <Grid item xs={2}>
          <Typography variant='h4' align='center'>VS</Typography>
        </Grid>

        <Grid item xs container direction='column'>
          <Paper>

            <Grid item xs>
              <Typography variant='h5' align='center' className={classes.text}>
                {players.player2}
              </Typography>
            </Grid>

            <Grid item container>
              {values.map((product, index) => (
                <>

                  <TextField
                    id='filled-number'
                    label={index + 1}
                    value={product.player2}
                    type='number'
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin='normal'
                  />
                </>
              ))
              }
            </Grid>

            <Grid item xs>
              <Typography variant='h5' align='center' gutterBottom>{scoreCountP2}</Typography>
            </Grid>

          </Paper>
        </Grid>

      </Grid>
    </>
  )
}
