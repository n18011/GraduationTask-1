import React from 'react'
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core'

    /*const cards = [
  {
    title: 'A大会',
    time: '2019/10/30',
    place: '北谷'
  },
  {
    title: 'B大会',
    time: '2019/11/01',
    place: 'うるま'
  },
  {
    title: 'C大会',
    time: '2019/11/30',
    place: '那覇'
  }
    ]*/ 
export default ({cards}) => {
  return (
    <>
      <Grid container spacing={3} justify='center' alignItems='center'>
        {cards.map(card => (
          <Grid key={card.id} item md={3} xs={11}>
            <Card >
              <CardHeader title={card.id} />
              <CardContent >
                <Grid container direction='column'>
                  <Grid container item xs>
                    <Grid item xs>
                      <Typography color='textSecondary'>日時</Typography>
                      <Typography variant='body2'>{card.time}</Typography>
                    </Grid>
                    <Grid item xs>
                      <Typography color='textSecondary'>場所</Typography>
                      <Typography variant='body2' >{card.where}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
