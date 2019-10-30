import React, { useState, useEffect, useMemo } from 'react'

import request from 'superagent'

import { db } from '../Firebase'

import ResultView from '../components/ResultView'
import ResultForm from '../components/ResultForm'

export default () => {
  const [isProgresed, setIsProgresed] = useState(false)

  const [players, setPlayers] = useState({})
  const [values, setValues] = useState([])
  const [scoreCountP1, setScoreCountP1] = useState(0)
  const [scoreCountP2, setScoreCountP2] = useState(0)

  useMemo(() => {
    const eventCols = db.collection('events').doc('E001')
    const matchCols = eventCols.collection('matchs').doc('M001')
    matchCols.get()
      .then(doc => {
        setPlayers(doc.data().players)
      })
  }, [])

  useMemo(() => {
    request.get('https://asia-northeast1-graduation-task-d7fc3.cloudfunctions.net/api/tournaments/n18011no5/matches/178670632').end((err, res) => {
      const scores = res.body.match.scoresCsv.split(',')
      const data = []
      scores.map(score => {
        const setPoint = score.split('-')
        data.push({ player1: setPoint[0], player2: setPoint[1] })
      })
      setValues(data)
    })
  }, [])

  useEffect(() => {
    var p1point = 0
    var p2point = 0
    values.map(value => {
      if (Number(value.player1) < Number(value.player2)) {
        p2point++
      } else {
        p1point++
      }
    })
    setScoreCountP1(p1point)
    setScoreCountP2(p2point)
  }, [values])

  /*
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  */
  useMemo(() => {
    const eventRef = db.collection('events').doc('E001')
    eventRef.collection('matchs').doc('M001').get()
      .then(doc => {
        setIsProgresed(doc.data().match_status.progresed)
      })
  }, [])

  return (
    <>
      {isProgresed ? (
        <ResultView
          players={players}
          scoreCountP1={scoreCountP1}
          scoreCountP2={scoreCountP2}
          values={values}
        />
      ) : <ResultForm players={players} />}
    </>
  )
}
