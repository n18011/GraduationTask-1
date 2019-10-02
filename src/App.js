import React from 'react'

const gamed = [
  'うるま市大会',
  '那覇市大会',
  '浦添市大会'
]

const gaming = [
  '名護市大会',
  '北中城村大会',
  '読谷村大会',
  '北谷町大会'
]

const GameList = ({ games }) => {
  return (
    <ul>
      {games.map(game => (
        <li>{game}</li>
      ))}
    </ul>
  )
}

export default () => {
  return (
    <>
      <h3>進行中</h3>
      <GameList games={gamed} />
      <h3>過去の大会</h3>
      <GameList games={gaming} />
    </>
  )
}
