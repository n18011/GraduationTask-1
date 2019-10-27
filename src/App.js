import React from 'react'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import { AuthProvider } from './components/Auth'
import { makeStyles } from '@material-ui/core/styles'

import Header from './components/Header'
import Top from './views/Top'
import Login from './views/Login'
import Divide from './views/Divide'
import Events from './views/Events'
import Event from './views/Event'
import Result from './views/Result'
import Held from './views/Held'
import PlayerHome from './views/PlayerHome'
import NotHold from './views/NotHold'
import PlayerApply from './views/PlayerApply'
import Join from './views/Join'
import PlayerResult from './views/PlayerResult'
import PlayerDelete from './views/PlayerDelete'
import AdminHome from './views/AdminHome'
import AdminApply from './views/AdminApply'
import AdminChange from './views/AdminChange'

const useStyles = makeStyles(theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  }
}))

export default () => {
  const classes = useStyles()
  return (
    <AuthProvider>
      <Router>
        <Header />
        <main className={classes.layout}>
          <Route exact path='/' component={Top} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/divide' component={Divide} />
          <Route exact path='/events' component={Events} />
          <Route exact path='/events/:eid' component={Event} />
          <Route exact path='/events/:eid/matchs/:mid' component={Result} />
          <Route exact path='/held' component={Held} />
          <Route exact path='/player/:pid' component={PlayerHome} />
          <Route exact path='/nothold' component={NotHold} />
          <Route exact path='/events/:eid/apply' component={PlayerApply} />
          <Route exact path='/player/:pid/join' component={Join} />
          <Route exact path='/events/:eid/matchs/:mid/users/:uid' component={PlayerResult} />
          <Route exact path='/player/:pid/delete' component={PlayerDelete} />
          <Route exact path='/admin/:aid' component={AdminHome} />
          <Route exact path='/admin/:aid/input' component={AdminApply} />
          <Route exact path='/admin/:aid/change' component={AdminChange} />
        </main>
      </Router>

    </AuthProvider>
  )
}
