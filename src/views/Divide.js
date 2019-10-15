import React from 'react'

import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  Button,
  Typography
} from '@material-ui/core'

export default () => {
  return (
    <>
      <h1>Hello, Divide</h1>
      <Grid container >
        <Grid item md={4} xs>
          <Card>
            <CardHeader title={'選手'} />
            <CardActions >
              <Button color='primary' href='/player/:pid'>ページへ</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item >hidden</Grid>
        <Grid item md={4} xs>
          <Card>
            <CardHeader title={'主催者'} />
            <CardActions >
              <Button color='primary' href='/admin/:aid'>ページへ</Button>
            </CardActions>
          </Card>

        </Grid>
      </Grid>
    </>
  )
}
