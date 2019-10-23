import React, { useState, useMemo } from 'react'
import { db } from '../Firebase'
import EventsListWill from '../components/EventsListWill'

export default () => {
  const [events, setEvents] = useState([])
  useMemo(() => {
    const col = db.collection('events')

    // 更新イベント監視
    col.where('status.willhold', '==', true).onSnapshot(query => {
      const data = []
      query.forEach(doc => data.push({ ...doc.data(), id: doc.id }))
      setEvents(data)
    })

    return col
  }, [])

  return (
    <>
      <EventsListWill cards={events} />
    </>
  )
}
