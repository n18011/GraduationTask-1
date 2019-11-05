import React from 'react'

import { ResultFormProvider } from '../components/resultFormContext'
import ResultRouter from '../components/ResultRouter'

export default ({ match }) => {
  const eid = match.params.eid
  const mid = match.params.mid

  return (
    <ResultFormProvider >
      <ResultRouter eid={eid} mid={mid} />

    </ResultFormProvider>

  )
}
