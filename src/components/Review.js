import React, { useContext } from 'react'

import {
  Grid,
  Typography,
  ListItem,
  ListItemText
} from '@material-ui/core'

import { CreateFormContext } from './createFormContext'

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

export default () => {
  const { values } = useContext(CreateFormContext)
  return (
    <>
      <Typography variant='h6' gutterBottom>
      大会情報
      </Typography>
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
    </>
  )
}
