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
export default ({ players, values, scoreCountP1, scoreCountP2 }) => {
  const classes = useStyles()
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
