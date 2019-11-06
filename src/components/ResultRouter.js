import React, { useContext, useState, useMemo } from 'react'

import {db} from '../Firebase'
import ResultView from '../components/ResultView'
import ResultForm from '../components/ResultForm'

import { ResultFormContext } from '../components/resultFormContext'

export default ({ eid, mid }) => {
  const {  values, isProgresed, scoreCountP1, scoreCountP2 } = useContext(ResultFormContext)
  // const players = { player1: 'hoge', player2: 'fuga' }
  const [players, setPlayers] = useState(null)

  useMemo(() => {
    const eventCols = db.collection('events').doc(eid)
    const matchCols = eventCols.collection('matchs').doc(mid)
    matchCols.get()
      .then(doc => {
        setPlayers(doc.data().players)
      })
  }, [])
  return (
    <>
      {isProgresed ? (
        <ResultView
          eid={eid}
          mid={mid}
          players={players}
          scoreCountP1={scoreCountP1}
          scoreCountP2={scoreCountP2}
          values={values}
        />
      ) : (
        <ResultForm
          eid={eid}
          mid={mid}
          players={players} />
      )}
    </>
  )
}
