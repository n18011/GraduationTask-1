import React from 'react'

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core'

// VS以外の全てのTypography部にデータが入る
export default () => {
  return (
    <>
      <Grid container alignItems='center' justify='center'>
        <Grid container alignItems='center' justify='center' item xs={11} md>
          <Grid container direction='column' item spacing={1} md={3} xs>
            <Grid item>
              <Card>
                <CardHeader title={'head'} />
                <CardContent>
                  <Typography>body1</Typography>
                  <Typography>body2</Typography>
                  <Typography>body3</Typography>
                </CardContent>
                <CardContent>
                  <Typography>foot</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container alignItems='center' justify='center' item md={1} xs={2}>
            <Typography variant='h4'>VS</Typography>
          </Grid>
          <Grid container direction='column' item spacing={1} md={3} xs>
            <Grid item>
              <Card>
                <CardHeader title={'head'} />
                <CardContent>
                  <Typography>body1</Typography>
                  <Typography>body2</Typography>
                  <Typography>body3</Typography>
                </CardContent>
                <CardContent>
                  <Typography>foot</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
