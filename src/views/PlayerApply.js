import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
  Grid,
  Link,
  Paper,
  Typography,
  Button
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  text: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}))

const japanese = {
  name: '大会名',
  textmask: '電話番号',
  adress: 'メールアドレス',
  where: '開催場所',
  cost: '参加費',
  max_player: '参加人数',
  cheif: '主催者',
  coat: 'コート数',
  currency: 'マッチ', // <--game_format 型違う注意
  comment: 'コメント',
  rule: 'ルール',
  public: '公開日',
  when: '開催日',
  time: '開始時間'
}

// 完了コンポーネント
// トップへのところのLink hrefを変えればプレイヤー、管理者トップへ切り替え可
export default () => {
  const values = { name: '', coat: '20' }// firestoreからeventドキュメントのフィールド全て持ってくる
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const classes = useStyles()
  return (
    <>
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h4' align='center'>
        大会に申し込む
        </Typography>
        {activeStep === 0 ? (
          <>
            {Object.keys(values).map(value => (
        <>
          <Grid container spacing={1} direction='column'>
            {
              japanese[value] ? (
                <>
                  <Grid item xs={6}>
                    <Typography color='textPrimary' gutterBottom>
                      {japanese[value]}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography color='textSecondary' gutterBottom>
                      {JSON.stringify(values[value]).slice(1, -1)}
                    </Typography>
                  </Grid>
                </>
              ) : (<></>)
            }
          </Grid>
        </>
            ))}
            <Button
              variant='contained'
              color='primary'
              onClick={handleNext}
              className={classes.button}
            >
                    参加
            </Button>
          </>
        ) : (
          <React.Fragment>
            <Typography className={classes.text} variant='h5' gutterBottom>
                  Thank you for your order.
            </Typography>
            <Typography className={classes.text} variant='h6'>
              <Link href='/player/:pid'>
                個人ページ
              </Link>
            に戻る
            </Typography>
          </React.Fragment>
        )}
      </Paper>
    </>
  )
}
