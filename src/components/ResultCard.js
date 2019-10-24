
import React from 'react'

import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  paper: {
    width: 300,
    height: 300,
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 200
    }
  },
  list: {
    width: 200,
    height: 45
  },
  text: {
  }
}))

export default ({ children }) => {
  const classes = useStyles()

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
  return (
    <>

      <Paper className={classes.paper}>
        <Typography variant='h5' align='center'>(プレイヤー名)</Typography>
        {products.map((product, index) => {
          return (
            <>
              <List className={classes.list}>
                <Grid item xs>
                  <ListItem key={Object.keys(product)[0]} alignItem='center'>
                    <ListItemText secondary={index + 1} />
                    <Typography className={classes.text} variant='h6'>{product.player1}</Typography>
                  </ListItem>
                </Grid>
              </List>
            </>
          )
        })}
        <Typography variant='h5' align='center'>3(結果)</Typography>
      </Paper>
      {children}
      <Paper className={classes.paper}>
        {products.map((product, index) => {
          return (
            <>
              <List className={classes.list}>
                <Grid item xs>
                  <ListItem key={Object.keys(product)[1]}>
                    <ListItemText secondary={index + 1} />
                    <Typography variant='body2'>{product.player2}</Typography>
                  </ListItem>
                </Grid>
              </List>
            </>
          )
        })}
      </Paper>
    </>
  )
}
