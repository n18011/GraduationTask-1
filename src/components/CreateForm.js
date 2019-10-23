import React, { useContext } from 'react'

import {
  Grid,
  TextField,
  MenuItem
} from '@material-ui/core'

import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers'

import { makeStyles } from '@material-ui/core/styles'
import { CreateFormContext } from './createFormContext'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}))

const currencies = [
  {
    value: '3',
    label: '3セット'
  },
  {
    value: '5',
    label: '5セット'
  },
  {
    value: '7',
    label: '7セット'
  }
]

export default () => {
  const { values, handleChange, handleDateChange } = useContext(CreateFormContext)

  const classes = useStyles()
  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={3} >

          <Grid item xs={12}>
            <TextField
              required
              id='大会名'
              label='大会名'
              value={values.name}
              onChange={handleChange('name')}
              fullWidth
              autoComplete='event'
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id='開催場所'
              label='開催場所'
              value={values.where}
              onChange={handleChange('where')}
              fullWidth
              autoComplete='where'
            />
          </Grid>

          <Grid item xs={6}>
            <KeyboardDatePicker
              required
              margin='normal'
              id='開催日'
              label='開催日'
              format='MM/dd/yyyy'
              value={values.when}
              onChange={handleDateChange('when')}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            /></Grid>
          <Grid item xs={6}>
            <KeyboardTimePicker
              margin='normal'
              id='開催時間'
              label='開催時間'
              value={values.time}
              onChange={handleDateChange('time')}
              KeyboardButtonProps={{
                'aria-label': 'change time'
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <KeyboardDatePicker
              required
              id='申し込み期日'
              label='申し込み期日'
              format='MM/dd/yyyy'
              value={values.applicat}
              onChange={handleDateChange('applicat')}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            /></Grid>

          <Grid item xs={6}>
            <KeyboardDatePicker
              id='オーダー公開日'
              label='オーダー公開日'
              format='MM/dd/yyyy'
              value={values.public}
              onChange={handleDateChange('public')}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            /></Grid>

          <Grid item md={3} xs>
            <TextField
              id='参加費'
              label='参加費'
              value={values.cost}
              onChange={handleChange('cost')}
              type='number'
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>

          <Grid item md={3} xs>
            <TextField
              id='定員'
              label='定員'
              value={values.max_player}
              onChange={handleChange('max_player')}
              type='number'
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>

          <Grid item md={3} xs>
            <TextField
              id='コート数'
              label='コート数'
              value={values.coat}
              onChange={handleChange('coat')}
              type='number'
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </Grid>

          <Grid item md={3} xs>
            <TextField
              id='standard-select-currency'
              select
              label='マッチ'
              value={values.currency}
              onChange={handleChange('currency')}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
            >
              {currencies.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

        </Grid>
      </MuiPickersUtilsProvider>
    </>
  )
}
