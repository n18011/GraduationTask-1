import React from 'react'

import {
  Grid,
  Paper,
  Typography,
  TextField
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

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
  const [values, setValues] = React.useState({
    set1: 5,
    set2: 0,
    set3: 0,
    set4: 0,
    set5: null
  })

  const products = [
    {
      player1: '11',
      player2: '8'
    },
    {
      player1: '11',
      player2: '8'
    },
    {
      player1: '8',
      player2: '11'
    },
    {
      player1: '11',
      player2: '13'
    },
    {
      player1: '11',
      player2: '8'
    }
  ]

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
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
              {products.map((product, index) => (
                <>

                  <TextField
                    id='filled-number'
                    label={index + 1}
                    defaultvalue={`values.set${index + 1}`}
                    onChange={handleChange(`set${index + 1}`)}
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
              {products.map((product, index) => (
                <>

                  <TextField
                    id='filled-number'
                    label={index + 1}
                    defaultvalue={`values.set${index + 1}`}
                    onChange={handleChange(`set${index + 1}`)}
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
