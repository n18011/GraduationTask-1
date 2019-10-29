import React, { useContext } from 'react'

import {
  Button
} from '@material-ui/core'

import { CreateFormContext } from './createFormContext'

export default ({ aid, handler }) => {
  const { handleSend } = useContext(CreateFormContext)

  const handles = () => {
    handleSend(aid)
    handler()
  }
  return (
    <Button
      variant='contained'
      color='primary'
      onClick={() => handles()}
    >Place order</Button>
  )
}
