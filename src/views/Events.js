import React, { useState, useEffect } from 'react'
import firebase from '../Firebase'

export default () => {
  const [ image, setImage ] = useState('')
  const [ isLoading, setIsLoding ] = useState(false)

  useEffect(() => {
    fetch('/graduation-task-d7fc3/us-central1/helloWorld', {
      method: 'GET'
    }).then(res => {
      console.log(res)
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
