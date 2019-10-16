import React, { useEffect } from 'react'

import request from 'superagent'

export default () => {
  const state = 'held'

  useEffect(() => {
    request.get('/api')
      .end((err, res) => {
        console.log('This is /bigben/api => ', res)
      })

    request.get('/show')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        console.log('This is /bigben/api/show => ', res.body)
      })

    request.get('/events')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        console.log(res)
      })

    fetch('/events', {
      method: 'GET'
    }).then(response => response.body.json())
      .then(json => {
        console.log(json)
      })
  }, [])

  return (
    <>
      <h1>Hello, Events</h1>
    </>
  )
}
