import React from 'react'

// 現時点では大会が開かれていると見れる
export default ({ match }) => {
  const EID = match.params.eid
  const url = `https://challonge.com/ja/${EID}/module`
  return (
    <>
      <iframe title={EID} src={url} width='100%' height='500' frameborder='0' scrolling='auto' allowtransparency='true' />
    </>
  )
}
