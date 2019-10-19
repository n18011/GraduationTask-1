import React, { useMemo } from 'react'
import request from 'superagent'

export default () => {
  useMemo(() => {
    const post = async () => {
      await request.post('https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments')
        .set('Content-Type', 'application/json')
        .send({
          tournament: {
            name: 'n18011no1',
            url: 'n18011no1',
            tournamentType: 'single elimination'
          }
        })
        .end((err, res) => {
          console.log(err)
          console.log(res)
        })
    }
    post()
  }, [])
  return (
    <>
      <h1>Hello, Top</h1>
    </>
  )
}
