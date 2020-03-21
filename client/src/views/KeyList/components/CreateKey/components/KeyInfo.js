import React from 'react'
import { func, shape, string } from 'prop-types'

import { TextField } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Select from 'react-select'

const ROTATE_PERIOD = [
  {
    value: '30_DAYS',
    label: '30 days'
  },
  {
    value: '90_DAYS',
    label: '90 days'
  },
  {
    value: 'YEAR',
    label: 'Year'
  }
]
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  select: {
    width: '200px'
  }
}))

const KeyInfo = (props) => {

  const classes = useStyles();
  const { onChange, onSelect, keyInfo } = props;
  console.log(keyInfo.rotatePeriod);



  // handle func
  const handleChangeInput = (e) => {
    onChange && onChange(e);
  }
  const handleChangeSelect = (option) => {
    onSelect && onSelect(option.value);
    console.log(option);

  }
  return (
    <div
      className={classes.root}
    >
      <Grid
        container
        direction="column"
        spacing={3}
      >
        <Grid item>
          <TextField
            fullWidth
            label="Key alias"
            name="alias"
            onChange={handleChangeInput}
            required
            value={keyInfo.alias}
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            label="Description"
            name="description"
            onChange={handleChangeInput}
            value={keyInfo.description}
          />
        </Grid>
        <Grid item>
          <Select
            className={classes.select}
            name="rotatePeriod"
            onChange={handleChangeSelect}
            options={ROTATE_PERIOD}
            placeholder="Select rotate period"
            value={ROTATE_PERIOD.filter(obj => obj.value === keyInfo.rotatePeriod)}
          />
        </Grid>
      </Grid>

    </div>
  )
}
KeyInfo.propType = {
  onChange: func.isRequired,
  onSelect: func,
  keyInfo: shape({
    alias: string,
    description: string,
    rotatePeriod: string
  }),
}
export default KeyInfo;