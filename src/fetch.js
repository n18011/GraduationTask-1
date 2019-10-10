import React, { useEffect } from 'react'

import fetch from 'node-fetch'

export default () => {
  const handleClick = async () => {
    const url = 'https://api.challonge.com/v1/tournaments/jwwfxitk.json'
    return await fetch(url, {
      mode: 'cors',
      headers: {
        api_key: 'THQwE1NobDxeWTRbAb8ACEtrUV4jDse7C6N7PwvU'
      }
    })
      .then(res => {
        console.log(res)
      })
  }
  return (
    <>
    Hello
      <button onClick={() => handleClick()}>set</button>
    </>

  )
}
