import React, { useState, useEffect, useMemo } from 'react'

import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button
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
export default ({ players }) => {
  const classes = useStyles()
  const values = ['', '', '', '', '']
  const [points, setPoints] = useState(
    [
      {
        player1: '',
        player2: ''
      },
      {
        player1: '',
        player2: ''
      },
      {
        player1: '',
        player2: ''
      },
      {
        player1: '',
        player2: ''
      }
    ])

  const resultSend = () => { // TODO:対戦結果を送信する処理
    // TODO::challongeAPI側に送信する処理(Matchesのupdate)
    // '11-9,10-13,11-5,11-4'ようなCSV形式で
    // TODO::firestore側に送信する処理(progressを変える、得点を追加)
  }
  return (
    <>
      <Grid container alignItems='center' justify='center'>

        <Grid item xs container direction='column' justify='center'>

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
              <Typography variant='h5' align='center' gutterBottom>0</Typography>
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
              <Typography variant='h5' align='center' gutterBottom>0</Typography>
            </Grid>

          </Paper>

          <Button
            variant='contained'
            color='primary'
            onClick={() => alert('これから実装')}
          >得点入力</Button>

        </Grid>

      </Grid>
    </>
  )
}
