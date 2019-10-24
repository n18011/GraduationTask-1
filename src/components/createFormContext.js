import React, { createContext, useState } from 'react'
import request from 'superagent'
import {db} from '../Firebase'

const CreateFormContext = createContext()

const CreateFormProvider = ({ children }) => {
  const now = new Date()
  const [values, setValues] = useState({
    name: '',
    textmask: '(  )    -    ',
    adress: '',
    where: '',
    cost: '1000',
    max_player: '80',
    cheif: '(管理者とは限ら)ないです。',
    coat: '20',
    currency: '5', // <--game_format 型違う注意
    comment: '何かありましたら、ご連絡ください。',
    rule: '協会規定に基づく',
    status: 'willhold', // <-- 型違う注意
    public: now,
    when: now,
    applicat: now,
    time: now.setHours(9, 0, 0)
  })

  const handleDateChange = name => date => {
    setValues({ ...values, [name]: date })
  }

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }

  const handleSend = () => {
        /*const name = values.name
    const url = values.name
    const tournamentType = 'single elimination'
    await request.post('https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments')
      .send({
        tournament: {
          name,
          url,
          tournamentType
        } })
      .end((err, res) => {
        console.log(res.body)
      })*/

        // firebaseへの送信機能
        const eventName = values.name
        const eventInfo = values
        delete eventInfo.name
        const dbce =db.collection('events')
        let setEvent = dbce.doc(eventName).set(eventInfo)
  }

  return (
    <CreateFormContext.Provider value={{ values, handleChange, handleDateChange, handleSend }}>
      {children}
    </CreateFormContext.Provider>
  )
}

export { CreateFormContext, CreateFormProvider }
