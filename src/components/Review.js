import React, { useEffect, useContext } from 'react'

import {
  Grid,
  Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import { CreateFormContext } from './createFormContext'

const useStyles = makeStyles(theme => ({
  text: {
    marginTop: theme.spacing(1)
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

export default () => {
  const { values } = useContext(CreateFormContext)
  const classes = useStyles()

  // 開催日
  const when = JSON.stringify(values.when).slice(1, 11)

  // 開催時間
  const hour = String(values.time.getHours()).length === 1 ? '0' + String(values.time.getHours()) : values.time.getHours()
  const min = String(values.time.getMinutes()).length === 1 ? '0' + String(values.time.getMinutes()) : values.time.getMinutes()
  const time = `${hour}:${min}`

  // 公開日
  const publicV = JSON.stringify(values.public).slice(1, 11)
  // 申し込み期日
  const applicat = JSON.stringify(values.applicat).slice(1, 11)

  const result = {
    ...values,
    time,
    when,
    applicat,
    public: publicV
  }
  return (
    <>
      <Typography variant='h6' gutterBottom>
      大会情報
      </Typography>
      {Object.keys(result).map(value => (
        <>
          <Grid container spacing={1} direction='column'>
            {
              japanese[value] ? (
                <>
                  <Grid item xs>
                    <Typography className={classes.text} color='textSecondary'>
                      {japanese[value]}
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography color='textPrimary' gutterBottom>
                      {JSON.stringify(result[value]).slice(1, -1)}
                    </Typography>
                  </Grid>
                </>
              ) : (<></>)
            }
          </Grid>
        </>
      ))}
    </>
  )
}
