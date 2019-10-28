import React, { useState, useMemo } from 'react'
import { db } from '../Firebase'

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
  where: '開催場所',
  when: '開催日',
  time: '開始時間',
  applicat: '申し込み期日',
  public: '公開日',
  cost: '参加費',
  max_player: '参加人数',
  coat: 'コート数',
  currency: 'マッチ', // <--game_format 型違う注意
  cheif: '主催者',
  textmask: '電話番号',
  adress: 'メールアドレス',
  rule: 'ルール',
  comment: 'コメント'
}

// 完了コンポーネント
export default ({ match }) => {
  const EID = match.params.eid
  const [values, setValues] = useState({})
  const [activeStep, setActiveStep] = useState(0)

  useMemo(() => {
    db.collection('events').doc(EID).get().then(
      function (evinfo) {
        setValues({ ...evinfo.data(), name: evinfo.id })
      }
    )
  }, [])

  const review = {
    name: values.name,
    where: values.where,
    cost: values.cost,
    max_player: values.max_player,
    coat: values.coat,
    currency: values.currency,
    cheif: values.cheif,
    textmask: values.textmask,
    adress: values.adress,
    rule: values.rule,
    comment: values.comment
  }

  const handleNext = () => {
    db.collection('users').doc('U001').set({ // doc.idはログインしてるuser
      join: { [values.name]: true }
    }, { merge: true })
    setActiveStep(activeStep + 1)
  }

  const classes = useStyles()
  return (
    <>
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h4' align='center' gutterBottom>
          大会に申し込む
        </Typography>
        {activeStep === 0 ? (
          <>
            <Typography variant='h6' gutterBottom>
      大会情報
            </Typography>
            <Grid container direction='column' spacing={1}>
              {Object.keys(review).map(key => (
              <>
                <Grid item xs>
                  <Typography color='textSecondary'>
                    {japanese[key]}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography color='textPrimary' gutterBottom>
                    {review[key]}
                  </Typography>
                </Grid>
              </>
              ))}
              <Button
                variant='contained'
                color='primary'
                onClick={handleNext}
                className={classes.button}
              >参加する</Button>
            </Grid>
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
