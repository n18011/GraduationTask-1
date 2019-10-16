import React from 'react'

import {
  Grid,
  Card,
  CardHeader,
  CardActions,
  Button
} from '@material-ui/core'

export default () => { // ページ遷移時stateで pid or aid をもっている必要がある
  return (
    <>
      <Grid container justify='center'>
        <Grid container spacing={3} item md={6} xs={12}>
          <Grid item md={5} xs>
            <Card>
              <CardHeader title={'選手'} />
              <CardActions >
                <Button color='primary' href='/player/:pid'>ページへ</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item md={5} xs>
            <Card>
              <CardHeader title={'主催者'} />
              <CardActions >
                <Button color='primary' href='/admin/:aid'>ページへ</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
