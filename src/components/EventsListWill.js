import React from 'react'
import { db } from '../Firebase.js'

import request from 'superagent'

import {
  Link,
  Button,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'


/* const createData = (name, time, place) => {
  return { name, time, place }
} */

/* const rows = [
  createData('A大会', '2019/10/30', '北谷'),
  createData('B大会', '2019/11/01', 'うるま'),
  createData('C大会', '2019/11/30', '那覇')
] */

// 開催済み大会一覧
export default ({ cards, button, pid }) => {

  const handleClickStart = async (id) => {

    // challongeのトーナメント表をランダムにする

    const randomize = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/${id}/participants/randomize`
    await request.post(randomize).end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })

    // challongeのトーナメントを開始する処理
    const start = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/${id}/start`
    await request.post(start).end((err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log(res.body)
      }
    })

    // firestoreに追加する処理
    db.collection('events').doc(id).update({ status: { nowhold: true } })
    db.collection('users').doc(pid).get().then(
      function (doc) {
        console.log(doc.data().holdplans)
        const newpush = doc.data().holdplans
        delete newpush[id]
        console.log(newpush)
        db.collection('users').doc(pid).update({ holdplans: newpush }
        )
      }
    )

    const getInfourl = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/${id}/matches`

    request.get(getInfourl).end((err, res) => {

      const nom = Object.keys(res.body).length // Number of Matches

      const arrMatchid = []

      for (var i = 0; nom > i; i++) {
        arrMatchid.push(res.body[i].match.id)
      }

      for (i = 0; nom > i; i++) {
        db.collection('events').doc(id).collection('matchs').doc(arrMatchid[i].toString()).collection('point_details').doc('1').set({
          'player1': 0,
          'player2': 0
        })
      }

      for (var n = 0; nom > n; n++) {
        const MID = res.body[n].match.id
        console.log(MID)
        const P1Id = res.body[n].match.player1Id
        const P2Id = res.body[n].match.player2Id

        if (P1Id === null) {
          ;
        } else {
          const getnameurl1 = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/${id}/participants/` + P1Id

          request.get(getnameurl1).end((err, res) => {
            const addName = res.body.participant.name


            db.collection('events').doc(id).collection('matchs').doc(MID.toString()).set({
              'players': {
                'player1':addName
              },
              
              'round': 0,

              'match_status': {
                'abstention': false,
                'nonprogress': false,
                'progresed': false,
                'progress': false,
              }
            })
          })
        }

        if (P2Id === null) {
          ;
        } else {
          const getnameurl2 = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/${id}/participants/` + P2Id

          request.get(getnameurl2).end((err, res) => {
            const addName = res.body.participant.name


            db.collection('events').doc(id).collection('matchs').doc(MID.toString()).set({
              'players': {
                'player2': addName
              }
            }, { merge: true })
          })
        }
      }
    })
  }

  return (
    <>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>name</TableCell>
              <TableCell align='right'>time</TableCell>
              <TableCell align='right'>place</TableCell>
              {button ? <TableCell align='right'>button</TableCell> : ''}
            </TableRow>
          </TableHead>
          <TableBody>
            {cards ? cards.map(row => {
              const data = row.when ? JSON.stringify(row.when.toDate()).slice(1, 11) : ''
              const path = '/events/' + row.id
              return (
                <TableRow key={row.id}>
                  <TableCell component='th' scope='row'>
                    <Link href={path} color='inherit'>
                      {row.id}
                    </Link>
                  </TableCell>
                  <TableCell align='right'><Link href={path} color='inherit'>{data}</Link></TableCell>
                  <TableCell align='right'><Link href={path} color='inherit'>{row.where}</Link></TableCell>
                  {button ? <TableCell align='right'><Button onClick={() => handleClickStart(row.id)}>start</Button></TableCell> : ''}
                </TableRow>
              )
            }) : null}
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}
