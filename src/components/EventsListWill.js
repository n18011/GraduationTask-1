import React from 'react'

import {
  Grid,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'

    /*const createData = (name, time, place) => {
  return { name, time, place }
}*/

    /*const rows = [
  createData('A大会', '2019/10/30', '北谷'),
  createData('B大会', '2019/11/01', 'うるま'),
  createData('C大会', '2019/11/30', '那覇')
]*/

// 開催済み大会一覧
export default ({cards}) => {
  return (
    <>
      <Grid container direction='column' justify='center' alignItems='center' >
        <Grid item container justify='center' alignItems='center' xs>
          <Grid item md={9} xs={11}>
            <Paper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>name</TableCell>
                    <TableCell align='right'>time</TableCell>
                    <TableCell align='right'>place</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cards.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component='th' scope='row'>{row.id}</TableCell>
                      <TableCell align='right'>{row.time}</TableCell>
                      <TableCell align='right'>{row.where}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
