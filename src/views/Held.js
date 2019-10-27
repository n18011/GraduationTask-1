import React, { useState, useMemo } from 'react'
import { db } from '../Firebase'

import {
  Typography
} from '@material-ui/core'

import EventsListWill from '../components/EventsListWill' // propsに開催済み大会のデータ入力

export default () => {
  const [heldevents, setHevents] = useState([])
  useMemo(() => {
    const col = db.collection('events')
  
    col.where('status.held', '==', true).onSnapshot(query => {
      const data =[]
      query.forEach(doc => data.push({ ...doc.data(), id:doc.id }))
      setHevents(data)
    })
  }, [])

  return (
    <>
      <Typography variant='h4'>過去の大会</Typography>
      <EventsListWill cards={heldevents} />
    </>
  )
}
