import React, { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import {
  Link
} from 'react-router-dom'

import {
  AppBar,
  Toolbar,
  Typography,
  CssBaseline,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  Drawer,
  IconButton
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({

}))

export default () => {
  const classes = useStyles()
  const [state, setState] = useState({
    left: false
  })

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setState({ ...state, [side]: open })
  }

  const sideList = side => (
    <div
      className={classes.list}
      role='presentation'
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? 'inbox' : 'mail'}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  )
  return (
    <>
      <AppBar position='relative'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='menu'
            edge='start'
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h5' color='inherit' noWrap>
            大会運営アプリ
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
      <ul>
        <li><Link to='/'>Top</Link></li>
        <li><Link to='/login'>login</Link></li>
        <li><Link to='/divide'>divide</Link></li>
        <li><Link to='/events/'>events</Link></li>
        <li><Link to='/events/:eid/matchs/:mid'>result</Link></li>
        <li><Link to='/held'>held</Link></li>
        <li><Link to='/player/:pid'>PlayerHome</Link></li>
        <li><Link to='/nothold'>NotHold</Link></li>
        <li><Link to='/events/:eid'>PlayerApply</Link></li>
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
