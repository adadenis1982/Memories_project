import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Button,
  Avatar,
  Paper,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import { singup, singin } from '../../redux/actionCreators/authAC';

import Input from './Input';
import useStyles from './styles';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

function Auth() {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFromData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const handelShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handelSubmit = (event) => {
    event.preventDefault();
    if(isSignup) {
      dispatch(singup(formData, navigate))
    } else {
      dispatch(singin(formData, navigate))
    }
  };

  const handelChange = (event) => {
    // console.log({[event.target.name]: event.target.value});
    setFromData({...formData, [event.target.name]: event.target.value});
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log('Вход в Google не удался. Попробуйте снова позже');
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignup ? 'Зарегистрироваться' : 'Войти'}
        </Typography>
        <form className={classes.form} onSubmit={handelSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="Имя"
                  handelChange={handelChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Фамилия"
                  handelChange={handelChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Электронная почта"
              handelChange={handelChange}
              type="email"
            />
            <Input
              name="password"
              label="Пароль"
              handelChange={handelChange}
              type={showPassword ? 'text' : 'password'}
              handelShowPassword={handelShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Повторите пароль"
                handelChange={handelChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? 'Зарегистрироваться' : 'Войти'}
          </Button>
          {
            <GoogleLogin
              clientId={`${process.env.REACT_APP_CLIENT_ID}`}
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Войти через Google
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          }
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? 'Вы уже зарегистрированы? Войдите'
                  : 'Вы не зарегистрированы? Зарегистрируйтесь'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
