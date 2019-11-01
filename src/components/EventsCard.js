import React from 'react'
import { db } from '../Firebase'
import {
  Grid,
  Card,
  Link,
  Button,
  CardHeader,
  CardContent,
  CardActions,
  Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import request from 'superagent'

const useStyles = makeStyles(theme => ({
  card: {
    '&:hover': {
      boxShadow: '0 4px 6px 2px rgba(100, 105, 105, .3)'
    }
  }
}))

export default ({ cards, button }) => {
  const classes = useStyles()
  const handleClickStop = async (id) => {
    // challongeAPIにトーナメントの終了を送信する処理(POST)
    const finalize = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/${id}/finalize`
    await request.post(finalize).end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })

    // firestoreのstatusを開催済みにする
    await db.collection('events').doc(id).update({ status: { held: true } })
  }

  return (
    <>
      <Grid container spacing={3} justify='center' alignItems='center'>
        {cards ? cards.map(card => {
          const data = JSON.stringify(card.when.toDate()).slice(1, 11)
          const path = '/events/' + card.id
          return (
            <Grid item key={card.id} md={6} xs={6}>
              <Card className={classes.card}>
                <Link href={path} color='inherit'>
                  <CardHeader title={card.id} />
                  <CardContent >
                    <Grid container direction='column'>
                      <Grid container item xs>
                        <Grid item xs={12}>
                          <Typography color='textSecondary'>日時</Typography>
                          <Typography variant='body2'>{data}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography color='textSecondary'>場所</Typography>
                          <Typography variant='body2' >{card.where}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Link>
                <CardActions>
                  {button ? <Button onClick={() => handleClickStop(card.id)}>終了</Button> : ''}
                </CardActions>
              </Card>
            </Grid>
          )
        }) : null}
      </Grid>
    </>
  )
}
