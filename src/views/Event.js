import React, { useMemo, useState } from 'react'
import request from 'superagent'

import {
  Paper,
  Button,
  Link,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
}))
// 現時点では大会が開かれていると見れる
export default ({ match }) => {
  const classes = useStyles()
  const EID = match.params.eid
  const url = `https://challonge.com/ja/${EID}/module?theme=7506&show_standings=1`
  const [infomation, setInfo] = useState([])
  const [infoandname, setName] = useState([])

  console.log('infoandname => ', infoandname)
  useMemo(() => {
    const info = []
    request.get(`https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/${EID}/matches`).end((err, res) => {
      var length = Object.keys(res.body).length
      for (var i = 0; length > i; i++) {
        if (res.body[i].match['state'] === 'open') {
          info.push(res.body[i].match)
        }
        if (i === length - 1) {
          setInfo(info)
        }
      }
    })
  }, [])

  useMemo(() => {
    const P1 = {}
    const P2 = {}
    const matchLen = Object.keys(infomation).length

    for (var i = 0; matchLen > i; i++) {
      const url = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/${EID}/participants/` + infomation[i].player1Id
      const url2 = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/${EID}/participants/` + infomation[i].player2Id

      const main = async () => {
        let func1 = () => {
          request.get(url).end((err, res) => {
            P1[res.body.participant.id] = res.body.participant.name
            const keyarray = Object.keys(P1)
            var j = 0
            if (keyarray.length === matchLen) {
              while (matchLen > j) {
                var n = 0
                while (matchLen > n) {
                  console.log(infomation[j].player1Id)
                  console.log(keyarray[n])
                  if (infomation[j].player1Id.toString() === keyarray[n]) {
                    console.log('OK')
                    infomation[j].player1Name = P1[keyarray[n]]
                    break
                  } else {
                    console.log('Bad')
                    n++
                  }
                }
                j++
              }
            }
          })
        }

        let func2 = () => {
          request.get(url2).end((err, res) => {
            P2[res.body.participant.id] = res.body.participant.name
            const keyarray = Object.keys(P2)
            var j = 0
            if (keyarray.length === matchLen) {
              while (matchLen > j) {
                var n = 0
                while (matchLen > n) {
                  if (infomation[j].player2Id.toString() === keyarray[n]) {
                    console.log('N2OK')
                    infomation[j].player2Name = P2[keyarray[n]]
                    break
                  } else {
                    console.log('N2Bad')
                    n++
                  }
                }
                j++
                if (j === matchLen) {
                  setName(infomation)
                }
              }
            }
          })
        }

        await func1()
        func2()
      }
      main()
    }
  }, [infomation])

  return (
    <>
      <iframe title={EID} src={url} width='100%' height='500' frameborder='0' scrolling='auto' allowtransparency='true' />

      <Paper className={classes.paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ラウンド</TableCell>
              <TableCell>試合番号</TableCell>
              <TableCell>選手1</TableCell>
              <TableCell>選手2</TableCell>
              <TableCell>詳細</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {infoandname.map(info => {
              const path = `/events/${EID}/matchs/${info.id}`
              return (
                <TableRow>
                  <TableCell>
                    {info.round}回戦
                  </TableCell>

                  <TableCell>
                  第{info.suggestedPlayOrder}試合
                  </TableCell>

                  <TableCell>
                    {info.player1Name}
                  </TableCell>

                  <TableCell>
                    {info.player2Name}
                  </TableCell>
                  <TableCell>
                    <Link variant='body1' href={path} size='small' color='inherit' underline='always'>
                    詳細
                    </Link>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}
