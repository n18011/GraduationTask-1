import React, { createContext, useState } from 'react'
import { db } from '../Firebase'
import request from 'superagent'

const CreateFormContext = createContext()

const CreateFormProvider = ({ children }) => {
  const now = new Date(new Date().setHours(9, 0, 0))
  const [values, setValues] = useState({
    name: '',
    where: '',
    when: now,
    time: now,
    applicat: now,
    public: now,
    cost: 1000,
    max_player: 80,
    coat: 20,
    currency: '5', // <--game_format 型違う注意
    cheif: '',
    adress: '',
    textmask: '(  )    -    ',
    rule: '協会規定に基づく',
    comment: '何かありましたら、ご連絡ください。',
    status: 'willhold' // <-- 型違う注意
  })

  const handleDateChange = name => date => {
    setValues({ ...values, [name]: date })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSend = async () => {
    /*
    const name = values.name
    const url = values.name
    const tournamentType = 'single elimination'
    const tournament = {
      name,
      url,
      tournamentType
    }
    const post = async () => {
      await request.post('https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments').send({ tournament }).end((err, res) => {
        console.log(res.body)
      })
    }
    */

    // firebaseへの送信機能
    const eventName = values.name
    const eventInfo = {
      ...values,
      game_format: { [values.currency]: true },
      status: { willhold: true }
    }
    const dbce = db.collection('events')
    dbce.doc(eventName).set(eventInfo)

    db.collection('users').doc('U001').set({
      holdplans: { [values.name]: true }
    }, { merge: true })
    await post()
  }

  return (
    <CreateFormContext.Provider value={{ values, handleChange, handleDateChange, handleSend }}>
      {children}
    </CreateFormContext.Provider>
  )
}

export { CreateFormContext, CreateFormProvider }
