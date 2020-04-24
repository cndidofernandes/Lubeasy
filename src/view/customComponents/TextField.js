import React from 'react';

import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    searchBar: {
        borderRadius:'borderRadius',
        background: blueGrey[50],
        minWidth:200,
        flexGrow: 1,
        padding: '0px 4px',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        flexGrow: 1,
        marginLeft: theme.spacing(1)
    },
      
  }));

export default function TextField({ icon, propsInputBase, disabled, error, helperText}) {
    const classes = useStyles();

  return (
    <div style={{marginBottom: error ? 6 : 20}}>
      <Box className={classes.searchBar} borderRadius={100}>
          <IconButton>
              {icon}
          </IconButton>
          <InputBase className={classes.input} disabled={disabled} {...propsInputBase}/>
      </Box>
      { error && (
          <Typography style={{paddingTop: 14, paddingLeft: 21}} align={'justify'} variant='caption' color='error'>
            {helperText}
          </Typography>
        )
        }
    </div>
  );
}
