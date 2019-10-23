import React, { useState, useMemo } from 'react'
import { db } from '../Firebase'
import EventsCard from '../components/EventsCard'
import EventsListWill from '../components/EventsListWill'

export default () => {
  const [willevents, setWevents] = useState([])
  const [heldevents, setHevents] = useState([])

  useMemo(() => {
    const col = db.collection('events')

    col.where('status.willhold', '==', true).onSnapshot(query => {
      const data = []
      query.forEach(doc => data.push({ ...doc.data(), id: doc.id }))
      setWevents(data)
    })
    return col
  }, [])

  useMemo(() => {
    const col = db.collection('events')

    col.where('status.held', '==', true).onSnapshot(query => {
      const data = []
      query.forEach(doc => data.push({ id: doc.id }))
      setHevents(data)
    })
  }, [])

  return (
      <>
        <EventsCard cards={willevents} />
        <EventsListWill cards={heldevents} />
    </>
  )
}
