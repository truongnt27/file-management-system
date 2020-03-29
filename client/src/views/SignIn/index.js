import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
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
  Card
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import axios from 'axios';

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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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

function SignIn(props) {
  const classes = useStyles();
  const { history } = props;

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

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const data = await axios.post('http://localhost:3002/api/auth/signin', formState.values)
      console.log(data);

    } catch (error) {

    }

  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;


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
            href="https://material-ui.com/"
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