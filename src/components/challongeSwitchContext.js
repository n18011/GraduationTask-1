import React, { createContext } from 'react'
import request from 'superagent'

const ChallongeSwitchContext = createContext()

const ChallongeSwitchProvider = ({ children }) => {

  const start = () => {
    // TODO:tournamentをスタートする処理(POST)
  }

  const stop = () => {
    // TODO:tournamentをストップする処理(POST)
  }

    /*
  const join = () => {
    // TODO:playerを新規作成する処理(POST)
  }
  */
  const reset = () => {
    // TODO:tournamentをリセットする処理(POST) *後回しで良い
  }
  const randomize = () => {
    // TODO:tournamentをランダムに振り分ける(POST)
  }

  return (
    <ChallongeSwitchContext.Provider value={start, stop, join, randomize}>
      {children}
    </ChallongeSwitchContext>
  )
}
