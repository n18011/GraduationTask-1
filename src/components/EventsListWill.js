import React from 'react'
import { db } from '../Firebase.js'
import { Field } from '../Firebase.js'

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
export default ({ cards, button, pid}) => {

  const handleClickStop = (id) => {
    /*    db.collection('events').doc(id).update({status:{willhold:false}}) */
    db.collection('events').doc(id).update({status:{nowhold: true}})
    db.collection('users').doc(pid).get().then(
      function(doc){
        console.log(doc.data().holdplans)
        const newpush = doc.data().holdplans
        delete newpush[id]
        console.log(newpush)
        db.collection('users').doc(pid).update({holdplans:newpush}
        )
      }
    )
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
                  {button ? <TableCell align='right'><Button onClick={() => handleClickStop(row.id)}>start</Button></TableCell> : ''}
                </TableRow>
              )
            }) : null}
          </TableBody>
        </Table>
      </Paper>
    </>
  )
}
