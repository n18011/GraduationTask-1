import React, { useState, useEffect, useMemo } from 'react'

import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import request from 'superagent'

import { db } from '../Firebase'

const useStyles = makeStyles(theme => ({
  card: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(3)
  },
  textField: {
    marginLeft: theme.spacing(3)
  },
  text: {
    marginTop: theme.spacing(2)
  }
}))
// VS以外の全てのTypography部にデータが入る
export default ({ eid, mid, players }) => {
  const classes = useStyles()
  const values = ['', '', '', '', '']
  const [playerId, setPlayerid] = useState()
  const [points, setPoints] = useState(
    [
      {
        player1: 0,
        player2: 0,
      },
      {
        player1: 0,
        player2: 0,
      },
      {
        player1: 0,
        player2: 0,
      },
    ])

  useEffect(() => {
    const url = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/n18011no5/matches/178670634`
    request.get(url).end((err, res) => {
      console.log(res.body['match'].player1Id)
      setPlayerid({
        player1Id : res.body['match'].player1Id,
        player2Id : res.body['match'].player2Id
      })
    })
  })

  const resultSend = () => { // TODO:対戦結果を送信する処理
    // TODO::challongeAPI側に送信する処理(Matchesのupdate)
    // '11-9,10-13,11-5,11-4'ようなCSV形式で


    const setvalue = Object.keys(points).length
    const url = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/n18011no5/matches/178670634`

    var n = 0
    var m = 0
    var csv = null
    var winnerid = null

    switch(setvalue) {

      case 1 : 
        const set1Point = points[0].player1+'-'+points[0].player2
        csv = set1Point
        for (var i; 1 > i; i++) {
          if (Number(points[0].player1) > Number(points[0].player2)){
            n++
          }
          else{
            m++
          }
        }
        break

      case 3 :
        csv = points[0].player1+'-'+points[0].player2+','+points[1].player1+'-'+points[1].player2+','+points[2].player1+'-'+points[2].player2


        for (i; 3 > i; i++) {
          if (Number(points[0].player1) > Number(points[0].player2)){
            n++
          }
          else{
            m++
          }
        }

        break

      case 4 :
        csv = points[0].player1+'-'+points[0].player2+','+points[1].player1+'-'+points[1].player2+','+points[2].player1+'-'+points[2].player2+','+points[3].player1+'-'+points[3].player2


        for (i; 4 > i; i++) {
          if (Number(points[0].player1) > Number(points[0].player2)){
            n++
          }
          else{
            m++
          }
        }


        break

      case 5 :
        csv = points[0].player1+'-'+points[0].player2+','+points[1].player1+'-'+points[1].player2+','+points[2].player1+'-'+points[2].player2+','+points[3].player1+'-'+points[3].player2+','+points[4].player1+'-'+points[4].player2


        for (i; 5 > i; i++) {
          if (Number(points[0].player1) > Number(points[0].player2)){
            n++
          }
          else{
            m++
          }
        }

        break
    
      default :
        csv = '0-0'
        console.log("error")
        break
    }

    if (n > m) {
      winnerid = playerId.player1Id
    } else {
      winnerid = playerId.player2Id
    }

    console.log(csv)

    request.put(url).send({match:{scoresCsv:csv,
                           winnerId: winnerid}}
                               ).end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })

    // TODO::firestore側に送信する処理(progressを変える、得点を追加)
    db.collection('events').doc('E001').collection('matchs').doc('M001').collection('point_details').doc('1').update({
      player1:11,
      player2:5
    })
  }

  const handleChange = (e, player) => {
    console.log('points[0] => ',points[1])
    setPoints([
    ])
  }
  return (
    <>
      <Grid container alignItems='center' justify='center'>

        <Grid item xs container direction='column' justify='center'>

          <Paper>

            <Grid item xs>
              <Typography variant='h5' align='center' className={classes.text}>
                {players ? players.player1 : 'unko'}
              </Typography>
            </Grid>

            <Grid item xs>
              {points.map((product, index) => (
                <>

                  <TextField
                    id='filled-number'
                    label={index + 1}
                    value={product.player1}
                    type='number'
                    onChange={(e) => handleChange(e, 'player1')}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin='normal'
                  />
                </>
              ))
              }
            </Grid>

            <Grid item xs>
              <Typography variant='h5' align='center' gutterBottom>0</Typography>
            </Grid>

          </Paper>
        </Grid>

        <Grid item xs={1}>
          <Typography variant='h4' align='center'>X</Typography>
        </Grid>

        <Grid item xs container direction='column'>
          <Paper>

            <Grid item xs>
              <Typography variant='h5' align='center' className={classes.text}>
                {players ? players.player2 : ''}
              </Typography>
            </Grid>

            <Grid item container>
              {points.map((product, index) => (
                <>

                  <TextField
                    id='filled-number'
                    label={index + 1}
                    value={product.player2}
                    type='number'
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    margin='normal'
                  />
                </>
              ))
              }
            </Grid>

            <Grid item xs>
              <Typography variant='h5' align='center' gutterBottom>0</Typography>
            </Grid>

          </Paper>

          <Button
            variant='contained'
            color='primary'
            onClick={() => resultSend()}
          >得点入力</Button>

        </Grid>

      </Grid>
    </>
  )
}
