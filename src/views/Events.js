import React, { useState, useEffect } from 'react'
const challonge = require('challonge')

const client = challonge.createClient({
  apiKey: process.env.CHALLONGE_KEY
})

export default () => {
  const [ image, setImage ] = useState('')
  const [ isLoading, setIsLoding ] = useState(false)

  useEffect(() => {
    client.tournaments.show({
      id: 'n18011Test',
      callback: (err, data) => {
        console.log(err + ' => ' + data)
      }
    })
  }, [])

  if (!isLoading) {
    return (
    <>
      <h1>Hello, Events</h1>
    </>
    )
  } else {
    return (
      <>
        <h1>{image}</h1>
      </>
    )
  }
}
