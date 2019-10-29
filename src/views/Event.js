import React, { useMemo, useState } from 'react'
import request from 'superagent'

// 現時点では大会が開かれていると見れる
export default ({ match }) => {
  const EID = match.params.eid
  const url = `https://challonge.com/ja/${EID}/module`
  const [infomation, setInfo] = useState([])

  useMemo(() => {
    const info = []
    request.get('https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/n18011no5/matches').end((err, res) => {
      var length = Object.keys(res.body).length
      for (var i = 0; length > i; i++) {
        if (res.body[i].match['state'] === 'open') {
          info.push(res.body[i].match)
        }
        if (i === length - 1) {
          setInfo(info)
        }
      }
    })
  }, [])
  useMemo(() => {
    const player1Id = []
    const player2Id = []
    infomation.forEach(info => {
      const url = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/n18011no5/participants/${info.player1Id}`
      request.get(url).end((err, res) => {
        player1Id.push(res.body.participant.name)
        console.log(res.body.participant.name)
        console.log(player1Id)
      })
      const url2 = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/n18011no5/participants/${info.player2Id}`
      request.get(url2).end((err, res) => {
        player2Id.push(res.body.participant.name)
      })
    })
    for (var i = 0; player1Id.length > i; i++) {
      infomation[i].player1Name = player1Id[i]
      infomation[i].player2Name = player2Id[i]
    }

    console.log('a' + 'i')
  }, [infomation])

  return (
    <>
      <iframe title={EID} src={url} width='100%' height='500' frameborder='0' scrolling='auto' allowtransparency='true' />

      <ul>
        {infomation.map(info =>
          <li>{info.round}回戦 第{info.suggestedPlayOrder}試合{} vs {}</li>

        )}
      </ul>
    </>
  )
}
