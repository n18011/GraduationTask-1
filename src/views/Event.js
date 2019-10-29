import React, { useMemo, useState } from 'react'
import request from 'superagent'

// 現時点では大会が開かれていると見れる
export default ({ match }) => {
  const EID = match.params.eid
  const url = `https://challonge.com/ja/${EID}/module`
  const [infomation, setInfo] = useState([])
  const [infoandname, setName] = useState([])

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
    const P1 = []
    const P2 = []
    const matchLen = Object.keys(infomation).length
    for (var i = 0; matchLen > i; i++) {
      const url = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/n18011no5/participants/` + infomation[i].player1Id
      
      const url2 = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/n18011no5/participants/` + infomation[i].player2Id

      request.get(url).end((err, res) => {
        P1.push(res.body.participant.name)
        if (P1.length === matchLen) {
          for (var j = 0; matchLen > j; j++) {
            infomation[j].player1Name = P1[j]
          }
        }
      })

      request.get(url2).end((err, res) => {
        P2.push(res.body.participant.name)
        if (P2.length === matchLen) {
          for (var j = 0; matchLen > j; j++) {
            infomation[j].player2Name = P2[j]
            if (j === matchLen-1) {
              setName(infomation)
            }
          } 
        }
      })
    }
  }, [infomation])

  return (
    <>
      <iframe title={EID} src={url} width='100%' height='500' frameborder='0' scrolling='auto' allowtransparency='true' />

      <ul>
        {infoandname.map(info =>
          <li>{info.round}回戦 第{info.suggestedPlayOrder}試合{info.player1Name} vs {info.player2Name}</li>

        )}
      </ul>
    </>
  )
}
