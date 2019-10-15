import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Link,
  Paper,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    height: 300
  },
  text: {
    margin: 'auto',
    textAlign: 'center',
    padding: theme.spacing(6)
  },
  bottom: {
    marginTop: 100,
    textAlign: 'center'
  }
}))

// 完了コンポーネント
// トップへのところのLink hrefを変えればプレイヤー、管理者トップへ切り替え可
export default () => {
  const classes = useStyles()
  return (
    <>
      <Grid container justify='center' alignItems='center' spacing={4}>
        <Grid item md={6} xs={10}>
          <Paper className={classes.paper}>
            <Typography className={classes.text} variant='h5'>完了しました</Typography>
            <Typography className={classes.bottom} variant='h6'>
              <Link href='/player/:pid'>
              トップへ
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
