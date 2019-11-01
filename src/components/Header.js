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
  Drawer,
  IconButton
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles(theme => ({
  bar: {
    background: 'linear-gradient(45deg, #77bb88 30%, #77bbdd 90%)',
    '&:hover': {
    }
  }
}))
const links = [
  {
    link: '/',
    title: 'Top'
  },
  {
    link: '/login',
    title: 'Login'
  },
  {
    link: '/divide',
    title: 'divede'
  },
  {
    link: '/events/:eid/matchs/:mid',
    title: 'result'
  },
  {
    link: '/held',
    title: 'held'
  },
  {
    link: '/player/:pid',
    title: 'playerhome'
  },
  {
    link: '/nothold',
    title: 'nothold'
  },
  {
    link: '/events/:eid/apply',
    title: 'playerapply'
  },
  {
    link: '/player/:pid/join',
    title: 'join'
  },
  {
    link: '/events/:eid/matchs/:mid/users/:uid',
    title: 'playerresult'
  },
  {
    link: '/player/:pid/delete',
    title: 'playerdelete'
  },
  {
    link: '/admin/:aid',
    title: 'adminhome'
  },
  {
    link: '/admin/:aid/input',
    title: 'adminapply'
  },
  {
    link: '/admin/:aid/change',
    title: 'adminchange'
  }
]

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
        {links.map((text, index) => (
          <ListItem button key={text.title}>
            <Link color='inherit' to={text.link} >
              <ListItemText primary={text.title} />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  )
  return (
    <>
      <AppBar position='relative' className={classes.bar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='menu'
            edge='start'
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant='h4' color='inherit' noWrap>
            Parima
          </Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </>
  )
}
