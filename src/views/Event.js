import React from 'react'

export default ({ match }) => {
  const EID = match.params.eid
  return (
    <>
    Hello, {EID}!
    </>
  )
}
