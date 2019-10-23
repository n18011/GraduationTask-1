import React, { useMemo } from 'react'
import request from 'superagent'

export default () => {
  useMemo(() => {
    const post = () => {
      request.put('https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/n18011no1')
        .set('Content-Type', 'application/json')
        .send({
          tournament: {
            name: 'n18011no2'
          }
        })
        .end((err, res) => {
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
