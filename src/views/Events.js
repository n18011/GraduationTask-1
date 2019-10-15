import React, { useState, useEffect } from 'react'

/*
    fetch('https://n18011.microcms.io/api/v1/portfolio2', {
      method: 'GET',
      headers: {
        'X-API-KEY': '00859d77-e51b-47ec-ba97-cd4b2265ecfc'
      }
    }).then(res => {
      return res.json()
    })
      .then(json => {
        console.log(JSON.stringify(json))
      })
      */
export default () => {
  const [ isLoading, setIsLoding ] = useState(false)

  useEffect(() => {
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
      </>
    )
  }
}
