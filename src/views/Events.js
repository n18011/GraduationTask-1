// 大会の進行状況ページ
import React, { useState } from 'react'

export default () => {
  const [match, setMatch] = useState('n18011Test')
  const url = `https://challonge.com/ja/${match}/module`
  return (
    <>
      <iframe src={url} width='100%' height='500' frameborder='0' scrolling='auto' allowtransparency='true' />
    </>
  )
}
