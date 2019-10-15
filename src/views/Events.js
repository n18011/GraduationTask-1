import React, { useState, useEffect } from 'react'

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
