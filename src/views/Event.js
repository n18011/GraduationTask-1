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
    const P1 = {}
    const P2 = {} 
    const matchLen = Object.keys(infomation).length

    for(var i = 0; matchLen > i; i++) {
      const url = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/n18011no5/participants/` + infomation[i].player1Id
      const url2 = `https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/n18011no5/participants/` + infomation[i].player2Id

      const main = async () => {

        let func1 = () => {request.get(url).end((err, res) => {
          P1[res.body.participant.id] = res.body.participant.name
          const keyarray = Object.keys(P1)
          var j = 0
          if (keyarray.length === matchLen) {
            while(matchLen > j) {
              var n = 0
              while(matchLen > n) {
                console.log(infomation[j].player1Id)
                console.log(keyarray[n])
                if (infomation[j].player1Id.toString() === keyarray[n]) {
                  console.log('OK')
                  infomation[j].player1Name = P1[keyarray[n]]
                  break
                }
                else {
                  console.log('Bad')
                  n++
                }
              }
              j++;
            }
          }
        })
        }

        let func2 = () => {request.get(url2).end((err, res) => {
          P2[res.body.participant.id] = res.body.participant.name
          const keyarray = Object.keys(P2)
          var j = 0
          if (keyarray.length === matchLen) {
            while(matchLen > j) {
              var n = 0
              while(matchLen > n) {
                if(infomation[j].player2Id.toString() === keyarray[n]) {
                  console.log('N2OK')
                  infomation[j].player2Name = P2[keyarray[n]]
                  break
                }
                else {
                  console.log('N2Bad')
                  n++
                }
              }
              j++;
              if (j === matchLen) {
                setName(infomation)
              }
            }
          }
        })
        }

        await func1()
        func2()

      }
      main()
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
