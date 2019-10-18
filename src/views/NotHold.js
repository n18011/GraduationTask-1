import React, { useState, useMemo } from 'react'

import db from '../Firebase'

import EventsCard from '../components/EventsCard'

export default () => {
  const [events, setEvents] = useState([])
  const collection = useMemo(() => {
    const col = db.collection('events')

    // 更新イベント監視
    col.where('status.willhold', '==', true).onSnapshot(query => {
      const data = []
      query.forEach(doc => data.push({ ...doc.data(), docId: doc.id }))
      setEvents(data)
    })

    return col
  }, [])

  return (
    <>
      <EventsCard cards={events} />
    </>
  )
}
