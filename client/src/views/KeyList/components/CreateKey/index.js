import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';

import { KeyInfo, KeySharing, KeyUsage } from './components';

import { useDispatch, useSelector } from 'react-redux';
import { usersSelector, FETCH_USER } from 'state/modules/app/users/actions';
import { createKeySaga } from 'state/modules/app/keys/actions'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: theme.spacing(3)
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

function getSteps() {
  return ['Fill key information', 'Define key sharing', 'Define key usage'];
}

export default function CreateKey() {

  const dispatch = useDispatch();
  const usersStore = useSelector(usersSelector);

  useEffect(() => {
    usersStore.status !== 'LOADED' && dispatch({ type: FETCH_USER })

  }, [usersStore.status])


  const classes = useStyles();
  const allUsers = Object.values(usersStore.byId);

  const [activeStep, setActiveStep] = useState(0);
  const [selectedUsers, setselectedUsers] = useState([]);

  const [keyInfo, setKeyInfo] = useState({
    alias: '',
    description: '',
    rotation: '',
    permissions: {}
  })

  const steps = getSteps();

  // handld functions
  const handleKeyInfo = (e) => {
    e.persist();
    setKeyInfo(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSelectRotate = (value) => {
    setKeyInfo(prev => ({
      ...prev,
      rotation: value
    }))
  }
  const handleSelectUsers = (selectedUserIdxs) => {
    setselectedUsers(selectedUserIdxs);
  }
  const handleKeyUsage = (selectedPermissions, userId) => {
    setKeyInfo(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [userId]: [...selectedPermissions]
      }
    }))
  }
  console.log(keyInfo);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <KeyInfo
            keyInfo={keyInfo}
            onChange={handleKeyInfo}
            onSelect={handleSelectRotate}
          />
        );
      case 1:
        return (
          <KeySharing
            allUsers={allUsers}
            onChange={handleSelectUsers}
            selectedUsers={selectedUsers}
          />
        );
      case 2:
        return (
          <KeyUsage
            keyInfo={keyInfo}
            onChange={handleKeyUsage}
            selectedUsers={selectedUsers.map(idx => allUsers[idx])}
          />
        );
      default:
        return 'Unknown step';
    }
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  const handleFinish = () => {
    setActiveStep(0);
    dispatch(createKeySaga(keyInfo));
  }
  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    className={classes.button}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    className={classes.button}
                    color="primary"
                    onClick={handleNext}
                    variant="contained"
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && handleFinish()}
    </div>
  );
}