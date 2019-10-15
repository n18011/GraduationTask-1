import React from 'react'

import {
  Grid,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core'

const createData = (name, time, place) => {
  return { name, time, place }
}

const rows = [
  createData('A大会', '2019/10/30', '北谷'),
  createData('B大会', '2019/11/01', 'うるま'),
  createData('C大会', '2019/11/30', '那覇')
]

// 開催済み大会一覧
export default () => {
  return (
    <>
      <Grid container direction='column' justify='center' alignItems='center'>
        <Grid item xs>
          <Typography variant='h4'>過去の大会</Typography>
        </Grid>
        <Grid item container justify='center' alignItems='center' xs>
          <Grid item md={8} xs={11}>
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
                  {rows.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component='th' scope='row'>{row.name}</TableCell>
                      <TableCell align='right'>{row.time}</TableCell>
                      <TableCell align='right'>{row.place}</TableCell>
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
