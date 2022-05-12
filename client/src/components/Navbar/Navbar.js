import React, { useState, useEffect }from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import decode from 'jwt-decode';

import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-Text.png';

import useStyles from './styles';

export default function Navbar() {

  const classes = useStyles();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    setUser(null);
  };
  
  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodeToken = decode(token);

      if(decodeToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])

  return (
     <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="icon" height="45px"/>
      {/* <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">
        Воспоминания
      </Typography> */}
      <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{ user.result.imageUrl ? user.result.name : user.result.name.split(' ')[0][0]}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
            <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>Выйти</Button>
          </div>
        ) : (
          <Button component={Link} to='/auth' variant="contained" color="primary">Войти</Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
