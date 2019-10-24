import React, { useContext } from 'react'

import {
  Button
} from '@material-ui/core'

import {CreateFormContext} from './createFormContext'

export default () => {
  const { handleSend } = useContext(CreateFormContext)
  return(
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleSend}
                  >Place order</Button>
  )
}
