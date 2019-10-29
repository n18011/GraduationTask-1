import React, { useState, useMemo } from 'react'

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
  const [values, setValues] = useState([
  ])

  /*
  useMemo(() => {
    const data = []
    const eventCols = db.collection('events').doc('E001')
    const matchCols = eventCols.collection('matchs').doc('M001')
    matchCols.collection('point_details').get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          data.push(doc.data())
        })
        setValues(data)
      })
  }, [])
  */
  useMemo(() => {
    request.get('https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/n18011no5/matches/178670632').end((err, res) => {
      console.log(res.body.match.scoresCsv)
      const scores = res.body.match.scoresCsv.split(',')
    })
  }, [])

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
                Player1
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
              <Typography variant='h5' align='center' gutterBottom>結果</Typography>
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
                Player2
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
              <Typography variant='h5' align='center' gutterBottom>結果</Typography>
            </Grid>

          </Paper>
        </Grid>

      </Grid>
    </>
  )
}
