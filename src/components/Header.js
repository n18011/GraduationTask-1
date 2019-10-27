import React from 'react'

import { Link } from 'react-router-dom'

import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline
} from '@material-ui/core'

export default () => {
  return (
    <>
      <AppBar position='relative'>
        <Toolbar>
          <Typography variant='h5' color='inherit' noWrap>
            大会運営アプリ
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <ul>
        <li><Link to='/'>Top</Link></li>
        <li><Link to='/login'>login</Link></li>
        <li><Link to='/divide'>divide</Link></li>
        <li><Link to='/events/'>events</Link></li>
        <li><Link to='/events/:eid'>event</Link></li>
        <li><Link to='/events/:eid/matchs/:mid'>result</Link></li>
        <li><Link to='/held'>held</Link></li>
        <li><Link to='/player/:pid'>PlayerHome</Link></li>
        <li><Link to='/nothold'>NotHold</Link></li>
        <li><Link to='/player/:pid/apply'>PlayerApply</Link></li>
        <li><Link to='/player/:pid/join'>join</Link></li>
        <li><Link to='/events/:eid/matchs/:mid/users/:uid'>PlayerResult</Link></li>
        <li><Link to='/player/:pid/delete'>PlayerDelete</Link></li>
        <li><Link to='/admin/:aid'>AdminHome</Link></li>
        <li><Link to='/admin/:aid/input'>AdminApply</Link></li>
        <li><Link to='/admin/:aid/change'>AdminChange</Link></li>
      </ul>
    </>
  )
}
