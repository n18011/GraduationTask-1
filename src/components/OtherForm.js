import React, { useState, useContext } from 'react'

import {
  Grid,
  TextField,
  Input,
  InputLabel,
  FormControl
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import MaskedInput from 'react-text-mask'

import { CreateFormContext } from './createFormContext'

const useStyles = makeStyles(theme => ({
}))

function TextMaskCustom (props) {
  const { inputRef, ...other } = props

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null)
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  )
}

export default () => {
  const classes = useStyles()

  const { values, handleChange } = useContext(CreateFormContext)

  /*
  const [values, setValues] = useState({
    textmask: '(  )    -    ',
    master: '(管理者とは限ら)ないです。'
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  */

  return (
    <>
      <Grid container spacing={3}>

        <Grid item xs={12} >
          <TextField
            id='standard-read-only-input'
            label='主催者'
            defaultValue={values.master}
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id='standard-read-only-input'
            label='メールアドレス'
            name='mail adress'
            className={classes.textField}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor='formatted-text-mask-input'>電話番号</InputLabel>
            <Input
              value={values.textmask}
              onChange={handleChange('textmask')}
              id='formatted-text-mask-input'
              inputComponent={TextMaskCustom}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id='standard-multiline-static'
            label='ルール'
            multiline
            fullWidth
            rows='4'
            defaultValue='協会規定に則る'
            margin='normal'
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id='standard-multiline-static'
            label='コメント'
            multiline
            fullWidth
            rows='4'
            defaultValue='何かありましたら、ご連絡ください。'
            margin='normal'
          />
        </Grid>

      </Grid>
    </>
  )
}
