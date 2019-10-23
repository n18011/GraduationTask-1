// 大会の進行状況ページ
import React from 'react'

export default () => {
  const match = 'n18011Test'
  const url = `https://challonge.com/ja/${match}/module`
  return (
    <>
      <iframe title={match} src={url} width='100%' height='500' frameborder='0' scrolling='auto' allowtransparency='true' />
    </>
  )
}
