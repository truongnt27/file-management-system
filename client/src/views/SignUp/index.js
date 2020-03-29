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
  FormHelperText,
  Container,
  Box,
  Card
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

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
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const schema = {
  username: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  policy: {
    presence: { allowEmpty: false, message: 'is required' },
    inclusion: {
      within: [true],
      message: 'is reqired'
    }
  },
};

function SignUp(props) {
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

  const handleSignUp = event => {
    event.preventDefault();
    history.push('/');
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
          Sign up
        </Typography>
        <form
          className={classes.form}
        >
          <TextField
            autoFocus
            className={classes.textField}
            error={hasError('username')}
            fullWidth
            helperText={
              hasError('username') ? formState.errors.username[0] : null
            }
            id="username"
            label="Username"
            margin="normal"
            name="username"
            onChange={handleChange}
            required
            type="text"
            variant="outlined"
          />
          <TextField
            className={classes.textField}
            error={hasError('email')}
            fullWidth
            helperText={
              hasError('email') ? formState.errors.email[0] : null
            }
            label="Email address"
            margin="normal"
            name="email"
            onChange={handleChange}
            required
            type="text"
            value={formState.values.email || ''}
            variant="outlined"
          />
          <TextField
            className={classes.textField}
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
          <div className={classes.policy}>
            <Checkbox
              checked={formState.values.policy || false}
              className={classes.policyCheckbox}
              color="primary"
              name="policy"
              onChange={handleChange}
            />
            <Typography
              color="textSecondary"
              variant="body1"
            >
              I have read the{' '}
              <Link
                color="primary"
                component={RouterLink}
                to="#"
                underline="always"
                variant="h6"
              >
                Terms and Conditions
              </Link>
            </Typography>
          </div>
          {hasError('policy') && (
            <FormHelperText error>
              {formState.errors.policy[0]}
            </FormHelperText>
          )}
          <Button
            className={classes.submit}
            color="primary"
            disabled={!formState.isValid}
            fullWidth
            onClick={handleSignUp}
            type="submit"
            variant="contained"
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid
              alignItems="center"
              item
            >
              <Link
                component={RouterLink}
                to="/sign-in"
                variant="body2"
              >
                {'Already have an account? Sign In'}
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
SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);