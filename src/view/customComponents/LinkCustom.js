import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  link: {
    color: '#515149',
    textDecoration: 'none',
  } 
}));


export default function LinkCustom({path, text, disabled}) {
  const classes = useStyles();

  if (disabled) {
    return (<Typography variant='body2' color='textSecondary'>{text}</Typography>)
  } else {
    return (<Link className={classes.link} to={path}>{text}</Link>);
  }

}
