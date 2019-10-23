
import React from 'react'

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  List,
  ListItem,
  ListItemText,
  Paper
} from '@material-ui/core'

export default () => {
  const products = [
    {
      name: 'asdfa',
      desc: 'asdfb',
      price: 'asdfc'
    }
  ]
  return (
    <>
      <Paper>

        <List>

          {products.map(product => (
            <ListItem key={product.name}>
              <ListItemText primary={product.name} secondary={product.desc} />
              <Typography variant='body2'>{product.price}</Typography>
            </ListItem>
          ))}
          <Typography variant='subtitle1' align='center'>
            $34.06
          </Typography>
        </List>

      </Paper>
    </>
  )
}
