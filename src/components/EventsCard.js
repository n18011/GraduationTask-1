import React from 'react'
import {
  Grid,
  Card,
  Link,
  Button,
  CardHeader,
  CardContent,
  Typography
} from '@material-ui/core'

/* const cards = [
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
    ] */
export default ({ cards, button }) => {
  const handleClick = () => {
  }
  return (
    <>
      <Grid container spacing={3} justify='center' alignItems='center'>
        {cards ? cards.map(card => {
          const data = JSON.stringify(card.when.toDate()).slice(1, 11)
          const path = '/events/' + card.id
          return (
            <Grid item key={card.id} md={6} xs={6}>
              <Link href={path}>
                <Card >
                  <CardHeader title={card.id} />

                  {button ? <Button onClick={handleClick}>send</Button> : ''}
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
                </Card>
              </Link>
            </Grid>
          )
        }) : null}
      </Grid>
    </>
  )
}
