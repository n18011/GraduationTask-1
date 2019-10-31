import React, { useState } from 'react'

import request from 'superagent'

export default () => {
  const [tournament, setTournament] = useState({ name: 'testParty6', url: 'testParty6', tournamentType: 'single elimination' })

  console.log(tournament)
  const handleClick = () => {
    request.post('https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments').send({ tournament }).end((err, res) => {
      console.log(res.body)
    })
  }
  return (
    <>
      <h1>Hello, PlayerDelete</h1>
      <button onClick={() => handleClick()}> send</button>
    </>
  )
}
