import React, { useContext } from 'react'

import ResultView from '../components/ResultView'
import ResultForm from '../components/ResultForm'

import { ResultFormContext } from '../components/resultFormContext'

export default () => {
  const { players, values, isProgresed, scoreCountP1, scoreCountP2 } = useContext(ResultFormContext)

  // const players = { player1: 'hoge', player2: 'fuga' }
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
