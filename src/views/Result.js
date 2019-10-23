import React from 'react'

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import ResultCard from '../components/ResultCard'

const useStyles = makeStyles(theme => ({
  card: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}))
// VS以外の全てのTypography部にデータが入る
export default () => {
  const classes = useStyles()
  return (
    <>
      <Grid container alignItems='center' justify='center'>

        <Grid item xs>
          <ResultCard />
        </Grid>

        <Grid item xs={2}>
          <Typography variant='h4' align='center'>VS</Typography>
        </Grid>

        <Grid item xs>
          <Card>
            <CardHeader title={'head'} align='center' />
            <CardContent>
              <Typography>body1</Typography>
              <Typography>body2</Typography>
              <Typography>body3</Typography>
            </CardContent>
            <CardContent>
              <Typography align='center'>foot</Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </>
  )
}
