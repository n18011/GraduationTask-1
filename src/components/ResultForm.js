import React, { useState, useEffect } from 'react'

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
  },
  x: {
    marginTop: theme.spacing(2)
  },
  button: {
    [theme.breakpoints.up('xs')]: {
      width: '40vh',
      marginLeft: theme.spacing(3)
    },
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: '80vh',
      marginLeft: theme.spacing(1)
    }
  }
}))
// VS以外の全てのTypography部にデータが入る
export default ({ eid, mid, players }) => {
  const classes = useStyles()
  const [playerId, setPlayerid] = useState()
  const [points1, setPoints1] = useState(
    {
      set1: {
        player1: 0,
      },
      set2: {
        player1: 0,
      },
      set3: {
        player1: 0,
      },
      set4: {
        player1: 0,
      },
      set5: {
        player1: 0,
      },
    })
  const [points2, setPoints2] = useState(
    {
      set1: {
        player2: 0,
      },
      set2: {
        player2: 0,
      },
      set3: {
        player2: 0,
      },
      set4: {
        player2: 0,
      },
      set5: {
        player2: 0,
      },
    })

  useEffect(() => {
    const url = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/n18011no5/matches/178670634`
    request.get(url).end((err, res) => {
      console.log(res.body)
      console.log(res.body['match'].player1Id)
      setPlayerid({
        player1Id: res.body['match'].player1Id,
        player2Id: res.body['match'].player2Id
      })
    })
  }, [])

  const resultSend = () => { // 対戦結果を送信する処理
    // challongeAPI側に送信する処理(Matchesのupdate)
    // '11-9,10-13,11-5,11-4'ようなCSV形式で


    const setvalue = Object.keys(points1).length
    const url = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/n18011no5/matches/178670634`

    var n = 0
    var m = 0
    var csv = null
    var winnerid = null

    switch (setvalue) {

      case 1:
        const set1Point = points1['set1'].player1 + '-' + points2['set1'].player2
        csv = set1Point
        for (var i; 1 > i; i++) {
          if (Number(points1['set1'].player1) > Number(points2['set1'].player2)) {
            n++
          }
          else {
            m++
          }
        }
        break

      case 3:
        csv = points1['set1'].player1 + '-' + points2['set1'].player2 + ',' + points1['set2'].player1 + '-' + points2['set2'].player2 + ',' + points1['set3'].player1 + '-' + points2['set3'].player2 + ',' + points1['set4'].player1 + '-' + points2['set4'].player2 + ',' + points1['set5'].player1 + '-' + points2['set5'].player2


        for (i = 1; 3 >= i; i++) {
          if (Number(points1['set' + i.toString()].player1) > Number(points2['set' + i.toString()].player2)) {
            n++
          }
          else {
            m++
          }
        }

        break

      case 4:
        csv = points1['set1'].player1 + '-' + points2['set1'].player2 + ',' + points1['set2'].player1 + '-' + points2['set2'].player2 + ',' + points1['set3'].player1 + '-' + points2['set3'].player2 + ',' + points1['set4'].player1 + '-' + points2['set4'].player2 + ',' + points1['set5'].player1 + '-' + points2['set5'].player2

        for (i = 1; 4 >= i; i++) {
          if (Number(points1['set' + i.toString()].player1) > Number(points2['set' + i.toString()].player2)) {
            n++
          }
          else {
            m++
          }
        }


        break

      case 5:
        csv = points1['set1'].player1 + '-' + points2['set1'].player2 + ',' + points1['set2'].player1 + '-' + points2['set2'].player2 + ',' + points1['set3'].player1 + '-' + points2['set3'].player2 + ',' + points1['set4'].player1 + '-' + points2['set4'].player2 + ',' + points1['set5'].player1 + '-' + points2['set5'].player2


        for (i = 1; 5 >= i; i++) {
          if (Number(points1['set' + i.toString()].player1) > Number(points2['set' + i.toString()].player2)) {
            n++
          }
          else {
            m++
          }
        }

        break

      default:
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

    request.put(url).send({
      match: {
        scoresCsv: csv,
        winnerId: winnerid
      }
    }
    ).end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })

    // firestore側に送信する処理(progressを変える、得点を追加)

    for (var j = 0; setvalue > j; j++) {
      var nj = j + 1
      db.collection('events').doc('E001').collection('matchs').doc('M001').collection('point_details').doc(nj.toString()).update({
        'player1': Number(points1['set' + nj.toString()].player1),
        'player2': Number(points2['set' + nj.toString()].player2)
      })
    }
  }

  const handleChange1 = (e, set) => {
    setPoints1(
      {
        ...points1,
        [set]: {
          player1: e.target.value
        }
      }
    )
  }
  const handleChange2 = (e, set) => {
    setPoints2(
      {
        ...points2,
        [set]: {
          player2: e.target.value
        }
      }
    )
  }
  return (
    <>
      <Paper>

        <Grid container justify='center'>
          <Grid item xs>
            <Typography variant='h5' align='center' className={classes.text}>
              {players ? players.player1 : 'unko'}
            </Typography>

            {Object.keys(points1).map((product, index) => (
              <>

                <TextField
                  id='filled-number'
                  label={index + 1}
                  value={product.player1}
                  type='number'
                  onChange={(e) => handleChange1(e, `set${index + 1}`)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  margin='normal'
                />
              </>
            ))
            }
            <Typography variant='h5' align='center' gutterBottom>0</Typography>
          </Grid>

          <Grid item md={1} xs={1}>
            <Typography variant='h4' className={classes.x}>X</Typography>
          </Grid>

          <Grid item xs>
            <Typography variant='h5' align='center' className={classes.text}>
              {players ? players.player2 : ''}
            </Typography>

            {Object.keys(points2).map((product, index) => (
              <>

                <TextField
                  id='filled-number'
                  label={index + 1}
                  value={product.player2}
                  onChange={(e) => handleChange2(e, `set${index + 1}`)}
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

            <Typography variant='h5' align='center' gutterBottom>0</Typography>
          </Grid>

          <Grid item md={11} xs={11}>
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={() => resultSend()}
            >得点入力</Button>
          </Grid>

        </Grid>
      </Paper>
    </>
  )
}
