import React from 'react'

export default ({ match }) => {
  const { params } = match
  return (
    <>
    Hello, {params.eid}!
    </>
  )
}
