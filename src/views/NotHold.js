import React, {useState, useEffect} from 'react'
import db from '../Firebase'
import EventsCard from '../components/EventsCard'

export default () => {
    const [events, setEvents] = useState([])
    useEffect(() => {
      const events = []
      let eventsRef = db.collection('events');
        eventsRef.where('status.willhold', '==', true).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
                events.push({
                    ...doc.data(),
                    id: doc.id})
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            })
        setEvents(events)
        },[])
    return (
        <div>
            <EventsCard cards={events}></EventsCard>
        </div>
  )
}
