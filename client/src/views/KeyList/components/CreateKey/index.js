import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { KeyInfo, KeySharing, KeyUsage } from './components'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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

const data = [
  {
    id: '1232',
    username: 'truongnt',
    email: 'truongnt@abc.com',
    role: 'manager'
  },
  {
    id: '1234',
    username: 'minhdt',
    email: 'minhdt@abc.com',
    role: 'member'
  },
  {
    id: '1235',
    username: 'datdt',
    email: 'datdt@abc.com',
    role: 'manager'
  }
]

export default function VerticalLinearStepper() {

  const classes = useStyles();
  const allUsers = data;

  const [activeStep, setActiveStep] = useState(0);
  const [selectedUsers, setselectedUsers] = useState([]);

  const [keyInfo, setKeyInfo] = useState({
    alias: '',
    description: '',
    rotatePeriod: '',
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
    const selectedUsers = selectedUserIdxs.map(idx => allUsers[idx]);
    setselectedUsers(selectedUsers);
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
          />
        );
      case 2:
        return (
          <KeyUsage
            keyInfo={keyInfo}
            onChange={handleKeyUsage}
            selectedUsers={selectedUsers}
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
              <Typography>{getStepContent(index)}</Typography>
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