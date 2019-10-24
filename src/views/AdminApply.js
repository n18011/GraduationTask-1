import React, { useState} from 'react'


import {
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  Link
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'

import CreateForm from '../components/CreateForm'
import OtherForm from '../components/OtherForm'
import Review from '../components/Review'
import SendButton from '../components/SendButton'
import { CreateFormProvider } from '../components/createFormContext'


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
  },
  text: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}))

const steps = ['大会情報', 'その他', '確認']

function getStepContent (step) {
  switch (step) {
    case 0:
      return <CreateForm />
    case 1:
      return <OtherForm />
    case 2:
      return <Review />
    default:
      throw new Error('Unknown step')
  }
}

export default () => {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const classes = useStyles()
  return (
    <>
      <CreateFormProvider>
        <Paper className={classes.paper}>
          <Typography component='h1' variant='h4' align='center'>
          大会を作る
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography className={classes.text} variant='h5' gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography className={classes.text} variant='h6'>
                  <Link href='/admin/:aid'>
                管理者ページ
                  </Link>
            に戻る
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ? (
                    <SendButton handler={handleNext}></SendButton>
                  ) :(
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={handleNext}
                    className={classes.button}
                  >Next</Button>
                  )
                  }
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </CreateFormProvider>
    </>
  )
}
