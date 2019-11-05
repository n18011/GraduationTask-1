import React from 'react'

import { ResultFormProvider } from '../components/resultFormContext'
import ResultRouter from '../components/ResultRouter'

export default () => {
  return (
    <ResultFormProvider >
      <ResultRouter />

    </ResultFormProvider>

  )
}
