import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';

import { useDispatch } from 'react-redux';
import { Actions } from 'state/modules/auth'

import {
  Grid,
  Button,
  TextField,
  Link,
  Typography,
  Avatar,
  CssBaseline,
  Checkbox,
  FormControlLabel,
  Container,
  Box,
  Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';
import axios from 'axios';

import { GoogleLogin } from 'react-google-login';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.error.light,
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  googleBtn: {
    backgroundColor: '#db3236',
    color: '#ffffff',

    '&:hover': {
      backgroundColor: '#c52d30',
      color: '#ffffff'
    }
  },
  socialIcon: {
    marginRight: theme.spacing(8)
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
}));

const schema = {
  email: {
    presence: { allowEmpty: false, message: 'is required' },

    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  }
};

function SignIn() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);


  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignInSocial = async (event, provider) => {
    event.preventDefault();
    //dispatch(Actions.authUser(provider, {}))
    try {
      // const options = {
      //   method: 'GET',
      //   headers: { 'Access-Control-Allow-Origin': '*' },
      //   url: 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3002%2Fapi%2Fauth%2Fgoogle%2Fcallback&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&client_id=1059460434373-ecabipeoun9l5s44qliuo3h9eujl3rhl.apps.googleusercontent.com'
      // 'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3002%2Fapi%2Fauth%2Fgoogle%2Fcallback&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&client_id=1059460434373-ecabipeoun9l5s44qliuo3h9eujl3rhl.apps.googleusercontent.com'
      // }

      // const res = await axios('http://localhost:3002/api/auth/google');
      // console.log(res);


    } catch (error) {
      console.log(error);

    }
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    dispatch(Actions.authUser('local', formState.values))

  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const responseGoogle = async (response) => {
    //const res = await fetch('http://')
    console.log(response.tokenObj);

    const res = await fetch('http://localhost:3002/api/auth/google/callback', {
      headers: {
        'Authorization': ` Bearer ${response.tokenObj.access_token}`
      }
    });
    const data = await res.json();
    console.log('data', data);

  }

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <Card className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
        >
          Sign in
        </Typography>
        <Grid
          className={classes.socialButtons}
          container
          direction="column"
          spacing={2}
        >
          <Grid item>
            <Button
              color="primary"
              fullWidth
              variant="contained"
            >
              <FacebookIcon
                className={classes.socialIcon}
              />
                Login with Facebook
            </Button>
          </Grid>
          <Grid item >
            {/* <GoogleLogin
              accessType="offline"
              autoLoad={false}
              buttonText="Login with facebook"
              clientId="1059460434373-ecabipeoun9l5s44qliuo3h9eujl3rhl.apps.googleusercontent.com"
              cookiePolicy={'single_host_origin'}
              onFailure={responseGoogle}
              onSuccess={responseGoogle}
            /> */}
            <Button
              className={classes.googleBtn}
              fullWidth
              //onClick={(e) => handleSignInSocial(e, 'google')}
              //onClick={handleSignIn}
              href="http://localhost:3002/api/auth/google"
              variant="contained"
            >
              <GoogleIcon
                className={classes.socialIcon}
              />
                Login with Google
            </Button>
          </Grid>
        </Grid>
        <Typography
          align="center"
          className={classes.sugestion}
          color="textSecondary"
          variant="body1"
        >
          OR
        </Typography>
        <form
          className={classes.form}
          noValidate
        >
          <TextField
            autoComplete="email"
            autoFocus
            error={hasError('email')}
            fullWidth
            helperText={
              hasError('email') ? formState.errors.email[0] : null
            }
            id="email"
            label="Email"
            margin="normal"
            name="email"
            onChange={handleChange}
            required
            variant="outlined"
          />
          <TextField
            autoComplete="current-password"
            error={hasError('password')}
            fullWidth
            helperText={
              hasError('password') ? formState.errors.password[0] : null
            }
            id="password"
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            required
            type="password"
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                value="remember"
              />
            }
            label="Remember me"
          />
          <Button
            className={classes.submit}
            color="primary"
            disabled={!formState.isValid}
            fullWidth
            onClick={handleSignIn}
            type="submit"
            variant="contained"
          >
            Sign In
          </Button>
          <Grid container>
            <Grid
              item
              xs
            >
              <Link
                href="#"
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                component={RouterLink}
                to="/sign-up"
                variant="body2"
              >
                {'Don\'t have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Card>
      <Box mt={8}>
        <Typography
          align="center"
          color="textSecondary"
          variant="body2"
        >
          {'Copyright © '}
          <Link
            color="inherit"
            href="#"
          >
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Container>
  );
}
SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);